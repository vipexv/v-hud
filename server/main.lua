---@diagnostic disable: lowercase-global
---@diagnostic disable: need-check-nil
if Config.vRP then
    local Tunnel = module("vrp", "lib/Tunnel")
    local Proxy = module("vrp", "lib/Proxy")
    vRP = Proxy.getInterface("vRP")               -- This reference allows us to access the vRP related functions
    vRPclient = Tunnel.getInterface("vRP", "vRP") -- This allows us to access vRP Client Functions.
    -- Now we have access to the vRP & vRPClient Functions
    -- We can start using and doing example usages!

    RegisterNetEvent("vrp_version:v-hud:GetStatus")
    AddEventHandler("vrp_version:v-hud:GetStatus", function()
        local user_id = vRP.getUserId({ source })
        TriggerClientEvent("vrp_version:v-hud:GetStatus:return", source,
            {
                thirst = vRP.getThirst({ user_id }),
                hunger = vRP.getHunger({ user_id }),
                money = vRP.getMoney({ user_id }),
                bank = vRP.getBankMoney({ user_id }),
                job = vRP.getUserGroupByType({ user_id, "job" })
            })
    end)
end
