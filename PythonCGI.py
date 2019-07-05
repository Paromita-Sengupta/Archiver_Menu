Mainmenu =[]
menu =[]
items =[]
Pvs =[]

file =  open("menu.data", "r")
lines = file.readlines()
# print lines


def save_Main_Menu(item):
    Mainmenu.append(item)


for line in lines:

        if "Menu" in line:
            match = line.strip()[line.find(': ') + 1 :line.find("\n") -0 ]
            Mainmenu.append(match)
            line = file.readline()
            for line in lines:

                if "Menu" in line:
                    match = line.strip()[line.find(': ') + 1:line.find("\n") - 0]
                    menu.append(match)

                if "End" in line:
                    break




            # for i in range(nextLine, len(lines)):
            #    print (i)

            # Mainmenu[match] = match


print Mainmenu
print menu

# for line in file:
#         if "Menu" in line :
#             match = line.strip()[line.find(': ') + 1 :line.find("\n") -0 ]
#             menu.append(match)
#
# print menu
#
# for line in file:
#         if "Menu" in line :
#             match = line.strip()[line.find(': ') + 1 :line.find("\n") -0 ]
#             menu.append(match)
#
# print menu