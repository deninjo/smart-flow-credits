-- Create dummy tariff
INSERT INTO public.tariffs (id, name, rate_per_liter, currency, active, effective_from)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'Standard Rate', 0.05, 'KES', true, now() - interval '30 days')
ON CONFLICT (id) DO NOTHING;

-- Create some sample alerts that can be used to demonstrate functionality
-- We'll leave user_id and meter_id as null for now since we don't have real users
INSERT INTO public.alerts (id, type, severity, title, message, acknowledged, created_at)
VALUES 
  ('alert111-1111-1111-1111-111111111111', 'low_balance', 'warning', 'Low Balance Warning', 'Your water balance is low. Please top up to avoid service interruption.', false, now() - interval '2 hours'),
  ('alert222-2222-2222-2222-222222222222', 'leak_detected', 'critical', 'Possible Leak Detected', 'Continuous water flow detected during off-peak hours. Please check for leaks.', false, now() - interval '1 hour'),
  ('alert333-3333-3333-3333-333333333333', 'maintenance', 'info', 'Scheduled Maintenance', 'System maintenance scheduled for this weekend from 2AM to 4AM.', true, now() - interval '24 hours')
ON CONFLICT (id) DO NOTHING;