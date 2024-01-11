# Clash Ninja - Calculate total upgrade time per building


- When calculating the upgrade costs and time, the Clash Ninja Progress Tracker lacks a feature: displaying total values for items that have multiple small upgrades. 
- Currently you can only see the bigger picture (total cost and time for each category, like defense, troops, resources), but if you want to know, say, how much time it will take to get all elixir collectors upgraded (not all collectors and storages from "resources" category), you will have a hard time estimating these values, because you can only see the cost and time for each small upgrade, but sometimes you have 5-15 upgrades, which takes time and resources... 
- This script calculates the total values for each individual building/troop that has more than one upgrade, so you can have a better overview before planning your upgrade priority.

### This script works on:
#### [Clash Ninja](https://www.clash.ninja/upgrade-tracker) - Clash of Clans Upgrade & Stats Tracker Website

.
## Before:
![image](https://github.com/gitpro2005/ClashNinja-Calculate-total-upgrade-time-per-building/assets/80659357/1ec4d586-7665-4393-a346-454c9b068d22)

## After:
![image](https://github.com/gitpro2005/ClashNinja-Calculate-total-upgrade-time-per-building/assets/80659357/dab52e19-e201-4633-8e3e-a61639a55581)



# How to use:

- The script should be run on console, every time there is a new table
- It can be turned into a bookmarklet for easy access (pro tip) [Bookmarklet Maker](https://caiorss.github.io/bookmarklet-maker/)

## Work in progress

You might have noticed that the project is incomplete

Currently, it is a run-once script, which means you have to run it after the page is loaded.
It just applies changes immediately as you run it. It doesn't work on background, and doesn't use EventListeners.
It won't work on Tampermonkey, for example, as it won't do anything.
In the future, the script will work as a User Script, and possibly as an extension. For this, it would have to automatically detect tables and apply changes to it.



## TO-DO:

- Publish as a bookmarklet on github, or add the bookmarklet option directly on README.md, so you could drag it to favorites bar
- Instead of having to run everytime a table appears, make it detect a new table and apply changes immediately
- Make it detect where it was already added, and not add totals again
- Rewrite the code/organize, making it more versatile and less redundant
- Add tweaks, such as if it should add totals if there is only one building, using variables to enable/disable them
- Turn the script into a User Script, and later, into am extension


# Screenshots: 

![image](https://github.com/gitpro2005/ClashNinja-Calculate-total-upgrade-time-per-building/assets/80659357/5470c036-d3f6-445a-ae59-2de71b3bb287)

### *As you can see, the site already shows the total cost and time for the category, but not for each item:*

When there are too many upgrades, it might not help.

![image](https://github.com/gitpro2005/ClashNinja-Calculate-total-upgrade-time-per-building/assets/80659357/61b70964-007d-4438-bfea-a39740c9c4e2)


