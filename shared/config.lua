Config = {
  QBCore = false,          -- Will update/enable status features to add hunger/thirst for this framework.
  ESX = false,             -- Same thing as the QB One but for ESX.
  vRP = false,             -- Same thing as the other ones, vRP functionality was made by Taco.
  Seatbelt = false,        --  (QB) Enables the seatbelt which will lead to more resource usage!
  EscapeMenuLoop = true,   -- (Standalone) Enable this to make the menu disappear when the user is in the Pause Menu, but this increases the resmon usage on the script due to the new loop, up to you.
  DisplayUserInfo = false, -- (QB/ESX/vRP) Display the user information, Job, Cash, Bank and Dirty Money if available.

  MenuOptions = {
    ID = true,      -- (Standalone) Enable to display the players ID in the HUD.
    Stress = false, -- (QB) Displays the user's stress using the QB Metadata, this isn't a fully written stress mechanic, simply grabs the info from metadata and displays it.
  },
}
