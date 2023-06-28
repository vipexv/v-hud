  if Config.QBCore then
      QBCore = exports["qb-core"]:GetCoreObject()
  end

  -- PlayerData = QBCore.Functions.GetPlayerData()

local function toggleNuiFrame(shouldShow)
  -- SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
  if Config.QBCore then
      SendReactMessage('setqbcore', true)
  end
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
      local playerStatsChanged = false
      
      if hp ~= oldHealth or armour ~= oldArmour or talking ~= oldState then
        playerStatsChanged = true
      end
      
      if playerStatsChanged then
        local playerStats = {
          hp = hp,
          armour = armour,
          micActive = talking,
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


local function loadHudQB()
  CreateThread(function()
    local oldHunger = nil
    local oldThirst = nil
    while loaded do
        local PlayerData = QBCore.Functions.GetPlayerData()
        local hunger = math.floor(PlayerData.metadata['hunger'])
        local thirst = math.floor(PlayerData.metadata['thirst'])
        local qbData = {
          hunger = hunger,
          thirst = thirst
        }
        if oldHunger ~= hunger or oldThirst ~= thirst then
        SendReactMessage("qbStatus", qbData)
        -- print(qbData.hunger)
        oldHunger = hunger
        oldThirst = thirst
        end
      Wait(1000)
    end
  end)
end

-- QB-Multicharacter Fix.

if Config.QBCore then
  RegisterNetEvent("QBCore:Client:OnPlayerLoaded", function()
    QBCore.Functions.Notify("Loading Hud!", 'success', 1000)
    Wait(2000)
    loaded = true
    loadHud()
    loadCarHud()
    loadHudQB()
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
    loadHudQB()
  end)