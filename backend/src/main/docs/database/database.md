## PraticaUi database

Updates:

> - 17/03/2022 - V1.0

### Scope:

This documentation refers only to the database used for the **PraticaUi** project.

### Standards:

> - The temperature data must be stored in Celsius.
> - The weight must be stored in grams.
> - The language must be stored in the 2 letter [ISO abbreviation](https://pt.wikipedia.org/wiki/ISO_639)

### Tables:

> - company - stores general information about the company that has stores and users belonging to it.
> - store - stores data about the physical location of a store.
> - user - stores data about the users registered to the platform.
> - userConfigs - stores general configs about the users preferences when using the platform.
> - equipmentType - stores the types of equipment currently supported by the platform.
> - equipment - stores data about the individual equipments owned by stores.
> - swVersion - stores data about all software versions that have been released.
> - images - stores the name of all images provided by the platform as well as the corresponding images for 1st generation exporting.
> - menu - stores information about the menus created by users or imported from equipments.
> - menuConfigs - stores data about the menu configs.
> - group - stores data the groups created by users or imported from equipments.
> - recipe - stores information about the individual recipes created by users for all equipments except C-MAX.
> - cmaxRecipe - stores information about the recipes created specifically for the C-MAX oven.
> - cookbookRecipe - stores information about the recipes created by our chefs available to be downloaded in the Cookbook.
> - stepSpeedOven - stores the recipe steps for all the speed ovens supported by the platform.
> - stepCombiOven - stores the recipe steps for all the combi ovens supported by the platform.
> - cmaxStep - stores the steps for the recipes created for the C-MAX oven.

### Table Columns:

#### company

Stores general information about the company that has stores and users belonging to it.

> - companyId - primary key.
> - corporateName - the corporate name pertaining to the company.
> - tradeName - the name by which the company is most commonly known by.
> - storesTotal - total number of stores under the company (statistical purpose).

---

#### store 

Stores data about the physical location of a store.

---

#### user 

Stores data about the users registered to the platform.

---

#### userConfigs 

Stores general configs about the users preferences when using the platform.

---

#### equipmentType

Stores the types of equipment currently supported by the platform.

---
#### equipment

Stores data about the individual equipments owned by stores.

---

#### swVersion

Stores data about all software versions that have been released.

---

#### images

Stores the name of all images provided by the platform as well as the corresponding images for 1st generation exporting.

---

#### menu

Stores information about the menus created by users or imported from equipments.

---

#### menuConfigs

Stores data about the menu configs.

---

#### group 

Stores data the groups created by users or imported from equipments.

---

#### recipe 

Stores information about the individual recipes created by users for all equipments except C-MAX.

---

#### cmaxRecipe

Stores information about the recipes created specifically for the C-MAX oven.

---

#### cookbookRecipe 

Stores information about the recipes created by our chefs available to be downloaded in the Cookbook.

---

#### stepSpeedOven 

Stores the recipe steps for all the speed ovens supported by the platform.

---

#### stepCombiOven 

Stores the recipe steps for all the combi ovens supported by the platform.

---

#### cmaxStep 

Stores the steps for the recipes created for the C-MAX oven.

---