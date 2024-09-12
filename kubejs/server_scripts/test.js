var molten_iron;
var molten_gold;
var molten_copper;
// Listen to item tag event
ServerEvents.tags('fluid', event => {
  // Get the #forge:cobblestone tag collection and add Diamond Ore to it
  event.add('c:molten_iron', 'molten_metals:molten_iron');
  event.add('tconstruct:molten_iron', 'molten_metals:molten_iron');
  event.add('c:molten_copper', 'molten_metals:molten_copper');
  event.add('tconstruct:molten_copper', 'molten_metals:molten_copper');
  event.add('c:molten_gold', 'molten_metals:molten_gold');
  event.add('tconstruct:molten_gold', 'molten_metals:molten_gold');
  molten_iron = e.get("c:molten_iron").getObjectIds();
  molten_gold = e.get("c:molten_gold").getObjectIds();
  molten_copper = e.get("c:molten_copper").getObjectIds();
})
/*
ServerEvents.tags('item', event => {
  // Get the #forge:cobblestone tag collection and add Diamond Ore to it
  event.add('c:molten_iron', 'molten_metals:molten_iron')
  event.add('tconstruct:molten_iron', 'molten_metals:molten_iron')
})
*/

ServerEvents.recipes(e => {
  let casting = (output, fluidTag, fluidAmount, mold) => {
    for(const fluid of fluidTag){
      console.info(fluid);
      e.recipes.create.filling(output, [Fluid.of(fluid, FluidAmount), mold]);
    }
  }
  casting(Item.of('tconstruct:pick_head', '{Material:"tconstruct:iron"}'), molten_iron, FluidAmounts.INGOT, '#tconstruct:casts/single_use/pick_head');
  casting(Item.of('tconstruct:pick_head', '{Material:"tconstruct:copper"}'), molten_copper, FluidAmounts.INGOT, '#tconstruct:casts/single_use/pick_head');

  casting(Item.of('tconstruct:small_axe_head', '{Material:"tconstruct:iron"}'), molten_iron, FluidAmounts.INGOT, '#tconstruct:casts/single_use/small_axe_head');
  casting(Item.of('tconstruct:small_axe_head', '{Material:"tconstruct:copper"}'), molten_copper, FluidAmounts.INGOT, '#tconstruct:casts/single_use/small_axe_head');

  casting(Item.of('tconstruct:broad_axe_head', '{Material:"tconstruct:iron"}'), molten_iron, FluidAmounts.INGOT, '#tconstruct:casts/single_use/broad_axe_head');
  casting(Item.of('tconstruct:broad_axe_head', '{Material:"tconstruct:copper"}'), molten_copper, FluidAmounts.INGOT, '#tconstruct:casts/single_use/broad_axe_head');

  e.recipes.create.compacting(['#minecraft:saplings', 'tconstruct:pick_head'], ['sand', 'tconstruct:pick_head']).keepIngredient('tconstruct:pick_head');
})
