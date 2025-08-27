-- Create dummy tariff
INSERT INTO public.tariffs (id, name, rate_per_liter, currency, active, effective_from)
VALUES 
  (gen_random_uuid(), 'Standard Rate', 0.05, 'KES', true, now() - interval '30 days');

-- Create some sample alerts using only valid enum values
INSERT INTO public.alerts (id, type, severity, title, message, acknowledged, created_at)
VALUES 
  (gen_random_uuid(), 'low_balance', 'warning', 'Low Balance Warning', 'Your water balance is low. Please top up to avoid service interruption.', false, now() - interval '2 hours'),
  (gen_random_uuid(), 'leak_detected', 'critical', 'Possible Leak Detected', 'Continuous water flow detected during off-peak hours. Please check for leaks.', false, now() - interval '1 hour');