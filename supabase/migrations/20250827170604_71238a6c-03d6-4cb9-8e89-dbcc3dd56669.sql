-- Create dummy tariff
INSERT INTO public.tariffs (id, name, rate_per_liter, currency, active, effective_from)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'Standard Rate', 0.05, 'KES', true, now() - interval '30 days');

-- Create dummy user profiles (these would normally be created by auth triggers)
INSERT INTO public.profiles (id, first_name, last_name, phone)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'John', 'Doe', '+254700123456'),
  ('22222222-2222-2222-2222-222222222222', 'Jane', 'Smith', '+254700234567'),
  ('33333333-3333-3333-3333-333333333333', 'Admin', 'User', '+254700345678');

-- Create dummy user roles
INSERT INTO public.user_roles (user_id, role)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'user'),
  ('22222222-2222-2222-2222-222222222222', 'user'),
  ('33333333-3333-3333-3333-333333333333', 'admin');

-- Create dummy meters
INSERT INTO public.meters (id, user_id, serial, address, latitude, longitude, status, current_tariff_id, low_balance_threshold_units)
VALUES 
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'MTR001', '123 Water Street, Nairobi', -1.2921, 36.8219, 'active', '550e8400-e29b-41d4-a716-446655440000', 5),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'MTR002', '456 Hydro Avenue, Nairobi', -1.2850, 36.8172, 'active', '550e8400-e29b-41d4-a716-446655440000', 10);

-- Create dummy meter balances
INSERT INTO public.meter_balances (meter_id, units_remaining, last_updated)
VALUES 
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 45.5, now() - interval '2 hours'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 150.0, now() - interval '1 hour');

-- Create dummy transactions
INSERT INTO public.transactions (id, meter_id, user_id, amount, units_purchased, status, provider, provider_ref)
VALUES 
  ('tx1111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 500, 100, 'confirmed', 'mpesa', 'MPX123456789'),
  ('tx2222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 1000, 200, 'confirmed', 'mpesa', 'MPX234567890'),
  ('tx3333333-3333-3333-3333-333333333333', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 750, 150, 'confirmed', 'mpesa', 'MPX345678901');

-- Create dummy consumption readings
INSERT INTO public.consumption_readings (meter_id, reading_at, total_volume_liters, flow_rate_lph)
VALUES 
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', now() - interval '24 hours', 1500.0, 2.5),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', now() - interval '12 hours', 1520.5, 1.8),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaa' || 'aaaa', now() - interval '1 hour', 1534.5, 0.5),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', now() - interval '24 hours', 2800.0, 1.2),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', now() - interval '12 hours', 2810.0, 0.8),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', now() - interval '1 hour', 2812.0, 0.3);

-- Create dummy alerts
INSERT INTO public.alerts (id, meter_id, user_id, type, severity, title, message, acknowledged)
VALUES 
  ('alert111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'low_balance', 'warning', 'Low Balance Warning', 'Your water balance is low. Please top up to avoid service interruption.', false),
  ('alert222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'leak_detected', 'critical', 'Possible Leak Detected', 'Continuous water flow detected during off-peak hours. Please check for leaks.', false);