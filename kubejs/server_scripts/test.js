ServerEvents.recipes(e => {
    e.recipes.create.filling(Item.of('tconstruct:pick_head', '{Material:"tconstruct:iron"}'), [Fluid.of('molten_metals:molten_iron',), '#tconstruct:casts/single_use/pick_head'])
    e.recipes.create.filling(Item.of('tconstruct:pick_head', '{Material:"tconstruct:iron"}'), [Fluid.of('#c:molten_iron',), '#tconstruct:casts/single_use/pick_head'])
    e.recipes.create.filling(Item.of('tconstruct:pick_head', '{Material:"tconstruct:copper"}'), [Fluid.of('molten_metals:molten_copper',), '#tconstruct:casts/single_use/pick_head'])
    e.recipes.create.filling(Item.of('tconstruct:pick_head', '{Material:"tconstruct:gold"}'), [Fluid.of('molten_metals:molten_gold',), '#tconstruct:casts/single_use/pick_head'])
  })
// Listen to item tag event
ServerEvents.tags('fluids', event => {
  // Get the #forge:cobblestone tag collection and add Diamond Ore to it
  event.add('c:molten_iron', 'molten_metals:molten_iron')
})