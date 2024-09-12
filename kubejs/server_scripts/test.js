// Listen to item tag event
ServerEvents.tags('fluid', event => {
  // Get the #forge:cobblestone tag collection and add Diamond Ore to it
  event.add('c:molten_iron', 'molten_metals:molten_iron')
  event.add('tconstruct:molten_iron', 'molten_metals:molten_iron')
  event.add('c:molten_copper', 'molten_metals:molten_copper')
  event.add('tconstruct:molten_copper', 'molten_metals:molten_copper')
  event.add('c:molten_gold', 'molten_metals:molten_gold')
  event.add('tconstruct:molten_gold', 'molten_metals:molten_gold')
})
/*
ServerEvents.tags('item', event => {
  // Get the #forge:cobblestone tag collection and add Diamond Ore to it
  event.add('c:molten_iron', 'molten_metals:molten_iron')
  event.add('tconstruct:molten_iron', 'molten_metals:molten_iron')
})
*/

ServerEvents.recipes(e => {
  //for(const fluid of )
  //e.recipes.create.filling(Item.of('tconstruct:pick_head', '{Material:"tconstruct:iron"}'), [Fluid.of('molten_metals:molten_iron',200), '#tconstruct:casts/single_use/pick_head'])
  e.recipes.create.filling(Item.of('tconstruct:pick_head', '{Material:"tconstruct:iron"}'), [Ingredient.of('#c:molten_iron',200), '#tconstruct:casts/single_use/pick_head'])
  e.recipes.create.filling(Item.of('tconstruct:pick_head', '{Material:"tconstruct:copper"}'), [Fluid.of('molten_metals:molten_copper'), '#tconstruct:casts/single_use/pick_head'])
  e.recipes.create.filling(Item.of('tconstruct:pick_head', '{Material:"tconstruct:gold"}'), [Fluid.of('molten_metals:molten_gold'), '#tconstruct:casts/single_use/pick_head'])
})
