# API Reference

## POST /strategy/execute

Used by frontend to trigger a strategy.

**Body:**
```json
{
  "amount": "5.0",
  "token": "0xabc...",
  "lp": "cetus",
  "strategy": "one_shot",
  "deployerId": "telegram_user_123"
}
