var molten_iron;
var molten_gold;
var molten_copper;
const tcMaterials = ['cobalt','darkthread','queens_slime','hepatizon','manyullyn','blazing_bone','enderslime','wood','rock','flint','bone','copper','bamboo','chorus','leather','string','phantom','rotten_flesh','iron','seared_stone','bloodbone','slimewood','necrotic_bone','scorched_stone','whitestone','ender_pearl','glass','gold','slimesteel','amethyst_bronze','nahuatl','pig_iron','rose_gold','plated_slimewood']

// Listen to item tag event
ServerEvents.tags('fluid', event => {
  // Get the #forge:cobblestone tag collection and add Diamond Ore to it
  event.add('c:molten_iron', 'molten_metals:molten_iron');
  event.add('tconstruct:molten_iron', 'molten_metals:molten_iron');
  event.add('c:molten_copper', 'molten_metals:molten_copper');
  event.add('tconstruct:molten_copper', 'molten_metals:molten_copper');
  event.add('c:molten_gold', 'molten_metals:molten_gold');
  event.add('tconstruct:molten_gold', 'molten_metals:molten_gold');
  molten_iron = event.get("c:molten_iron").getObjectIds();
  molten_gold = event.get("c:molten_gold").getObjectIds();
  molten_copper = event.get("c:molten_copper").getObjectIds();
})

ServerEvents.recipes(e => {
  let casting = (output, fluidTag, fluidAmount, mold) => {
    for(const fluid of fluidTag){
      e.recipes.create.filling(output, [Fluid.of(fluid, fluidAmount), mold]);
    }
  }
  casting(Item.of('tconstruct:pick_head', '{Material:"tconstruct:iron"}'), molten_iron, FluidAmounts.INGOT*2, '#tconstruct:casts/single_use/pick_head');
  casting(Item.of('tconstruct:pick_head', '{Material:"tconstruct:copper"}'), molten_copper, FluidAmounts.INGOT*2, '#tconstruct:casts/single_use/pick_head');

  casting(Item.of('tconstruct:small_axe_head', '{Material:"tconstruct:iron"}'), molten_iron, FluidAmounts.INGOT*2, '#tconstruct:casts/single_use/small_axe_head');
  casting(Item.of('tconstruct:small_axe_head', '{Material:"tconstruct:copper"}'), molten_copper, FluidAmounts.INGOT*2, '#tconstruct:casts/single_use/small_axe_head');

  casting(Item.of('tconstruct:broad_axe_head', '{Material:"tconstruct:iron"}'), molten_iron, FluidAmounts.INGOT*8, '#tconstruct:casts/single_use/broad_axe_head');
  casting(Item.of('tconstruct:broad_axe_head', '{Material:"tconstruct:copper"}'), molten_copper, FluidAmounts.INGOT*8, '#tconstruct:casts/single_use/broad_axe_head');

  for(const mold of Item.getTypeList()){
    if(Item.of(mold).hasTag('tconstruct:casts/single_use')){
      for(const material of tcMaterials){
        if(mold.includes('_red_sand_cast')){
          e.recipes.create.compacting([mold, Item.of(mold.replace('_red_sand_cast',''), '{Material:"tconstruct:' + material + '"}')], ['red_sand', Item.of(mold.replace('_red_sand_cast',''), '{Material:"tconstruct:' + material + '"}')]);
        } else {
          e.recipes.create.compacting([mold, Item.of(mold.replace('_sand_cast',''), '{Material:"tconstruct:' + material + '"}')], ['sand', Item.of(mold.replace('_sand_cast',''), '{Material:"tconstruct:' + material + '"}')]);
        }
      }
    }
  }
})
