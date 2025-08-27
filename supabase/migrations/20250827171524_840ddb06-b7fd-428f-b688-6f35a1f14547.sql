-- Create a function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  new_meter_id uuid;
  default_tariff_id uuid;
BEGIN
  -- Get the default tariff
  SELECT id INTO default_tariff_id 
  FROM public.tariffs 
  WHERE active = true 
  ORDER BY created_at DESC 
  LIMIT 1;

  -- Create profile for the new user
  INSERT INTO public.profiles (id, first_name, last_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  );

  -- Create user role (default to 'user')
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');

  -- Generate a new meter ID
  new_meter_id := gen_random_uuid();

  -- Create a meter for the new user with dummy data
  INSERT INTO public.meters (
    id, 
    user_id, 
    serial, 
    address, 
    latitude, 
    longitude, 
    status, 
    current_tariff_id, 
    low_balance_threshold_units
  )
  VALUES (
    new_meter_id,
    NEW.id,
    'MTR' || UPPER(SUBSTRING(new_meter_id::text FROM 1 FOR 8)),
    'Sample Address, Nairobi',
    -1.2921 + (RANDOM() - 0.5) * 0.02, -- Random lat around Nairobi
    36.8219 + (RANDOM() - 0.5) * 0.02, -- Random lng around Nairobi
    'active',
    default_tariff_id,
    10
  );

  -- Create initial meter balance with some dummy units
  INSERT INTO public.meter_balances (meter_id, units_remaining, last_updated)
  VALUES (new_meter_id, 50 + RANDOM() * 100, now());

  -- Create some dummy consumption readings
  INSERT INTO public.consumption_readings (meter_id, reading_at, total_volume_liters, flow_rate_lph)
  VALUES 
    (new_meter_id, now() - interval '24 hours', 100 + RANDOM() * 50, 1.5 + RANDOM()),
    (new_meter_id, now() - interval '12 hours', 120 + RANDOM() * 30, 1.2 + RANDOM() * 0.8),
    (new_meter_id, now() - interval '1 hour', 125 + RANDOM() * 20, 0.5 + RANDOM() * 0.5);

  -- Create a sample transaction
  INSERT INTO public.transactions (
    id,
    meter_id,
    user_id,
    amount,
    units_purchased,
    status,
    provider,
    provider_ref
  )
  VALUES (
    gen_random_uuid(),
    new_meter_id,
    NEW.id,
    500 + RANDOM() * 500,
    100 + RANDOM() * 100,
    'confirmed',
    'mpesa',
    'MPX' || FLOOR(RANDOM() * 1000000000)::text
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to run the function when a new user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();