local function toggleNuiFrame(shouldShow)
  -- SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
end


local function toggleVehHudFrame(shouldShow)
  -- SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVehV', shouldShow)
end


loaded = false

local function loadHud()
  toggleNuiFrame(true)
  CreateThread(function()
    local oldHealth = nil
    local oldArmour = nil
    local oldState = nil
    while loaded do
      local ped = PlayerPedId()
      local hp = GetEntityHealth(ped)
      local armour = GetPedArmour(ped)
      local talking = NetworkIsPlayerTalking(PlayerId())
      if hp ~= oldHealth or armour ~= oldArmour or talking ~= oldState then
          local playerStats = {
            hp = hp,
            armour = armour,
            micActive = talking
          }
          SendReactMessage("hudStats", playerStats)
          oldHealth = hp
          oldArmour = armour
          oldState = talking
      end
      Wait(1000)
    end
  end)
end

local function loadCarHud()
  CreateThread(function()
    while loaded do
      local ped = PlayerPedId()
      local isInVeh = IsPedInAnyVehicle(ped)
      Wait(1000)
      if isInVeh then 
        local vehicle = GetVehiclePedIsIn(ped, false)
        local gear = GetVehicleCurrentGear(vehicle)
        local fuel = GetVehicleFuelLevel(vehicle)
        local speed = GetEntitySpeed(vehicle) * 2.237 --Feel free to edit this if needed to switch to KMH, currently using MPH.
        -- toggleNuiFrame(true)
        toggleVehHudFrame(true)
        local vehStats = {
          gear = gear,
          fuel = fuel,
          speed = speed,
        }
        SendReactMessage("vehHud", vehStats)
      else
        toggleVehHudFrame(false)
      end
    end
  end)
end

-- QB-Multicharacter Fix.

if GetResourceState("qb-core") == "started" then
  local QBCore = exports["qb-core"]:GetCoreObject()
  RegisterNetEvent("QBCore:Client:OnPlayerLoaded", function()
    QBCore.Functions.Notify("Loading Hud!", 'success', 1000)
    Wait(2000)
    loaded = true
    loadHud()
    loadCarHud()
    QBCore.Functions.Notify("Hud Loaded!", 'success', 1000)
    print("Loaded Hud!")
  end)
  else
    print("Loading Hud!")
    Wait(2000)
    loaded = true
    loadHud()
    loadCarHud()
  end

  RegisterCommand("reloadHud", function()
    loaded = true
    loadHud()
    loadCarHud()
  end)