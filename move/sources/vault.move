// move/sources/vault.move
module volsui::vault {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    
    struct Vault has key {
        id: UID,
        owner: address,
        strategy_type: u8,
        balance: Balance<SUI>,
        risk_params: RiskParams,
        active: bool
    }

    struct RiskParams has store {
        max_drawdown: u64,
        volume_limit: u64,
        time_limit: u64,
        last_reset: u64
    }

    public fun create_vault(
        strategy_type: u8,
        max_drawdown: u64,
        volume_limit: u64,
        time_limit: u64,
        ctx: &mut TxContext
    ) {
        let vault = Vault {
            id: object::new(ctx),
            owner: tx_context::sender(ctx),
            strategy_type,
            balance: balance::zero(),
            risk_params: RiskParams {
                max_drawdown,
                volume_limit,
                time_limit,
                last_reset: tx_context::epoch(ctx)
            },
            active: true
        };
        transfer::share_object(vault);
    }
}
