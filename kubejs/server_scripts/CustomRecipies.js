var molten_iron;
var molten_gold;
var molten_copper;
var molds;
var tcParts
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

ServerEvents.tags('item', event => {
  molds = event.get('tconstruct:casts/single_use').getObjectIds();
  tcParts = event.get('tconstruct:parts').getObjectIds()
})

ServerEvents.recipes(e => { 

 
  e.remove({output: '#c:coal_nuggets'})
  e.recipes.create.crushing(Item.of('tinycoal:tinycoal',8), 'minecraft:coal')
  e.recipes.create.crushing(Item.of('tinycoal:tinycharcoal',8), 'minecraft:charcoal')

  e.recipes.create.mixing('gilded_blackstone',['#c:blackstone','#c:gold_ingots']).heated()
  e.recipes.create.mixing(['ancient_debris', 'ancient_debris', Item.of('ancient_debris').withChance(0.05)], ['gilded_blackstone', 'gilded_blackstone', '#c:netherrack', '#c:netherrack', '#c:basalt', '#c:basalt', 'ancient_debris', 'ancient_debris', Fluid.of('lava', FluidAmounts.B*5)]).superheated()
  e.recipes.create.filling('netherrack', [Fluid.of('water', FluidAmounts.MB*12), 'magma_block'])
  e.recipes.create.filling('magma_block', [Fluid.of('lava', FluidAmounts.MB*6), '#c:blackstone'])
    
  e.recipes.create.mixing(Fluid.of('tconstruct:molten_clay', FluidAmounts.INGOT),'minecraft:clay_ball').heated()
  e.recipes.create.mixing(Fluid.of('tconstruct:molten_clay', FluidAmounts.INGOT),'minecraft:brick').heated()
  e.recipes.create.mixing(Fluid.of('tconstruct:molten_clay', FluidAmounts.INGOT*2),'minecraft:brick_slab').heated()
  e.recipes.create.mixing(Fluid.of('tconstruct:molten_clay', FluidAmounts.INGOT*3),'minecraft:flower_pot').heated()
  e.recipes.create.mixing(Fluid.of('tconstruct:molten_clay', FluidAmounts.B),'minecraft:clay').heated()
  e.recipes.create.filling('tconstruct:seared_stone', [Fluid.of('tconstruct:molten_clay', FluidAmounts.B*0.5), '#c:stone'])

  let casting = (output, fluidTag, fluidAmount, mold) => {
    for(const fluid of fluidTag){
      e.recipes.create.filling(output, [Fluid.of(fluid, fluidAmount), mold]);
    }
  }
  for(const part of tcParts){
    console.info(part.toString())
    e.forEachRecipe({ output: part.toString() }, r => {
      console.info(r.json.get("type").asString)
      if(r.json.get("type").asString == 'tconstruct:table_casting_material'){
        casting(Item.of(part, '{Material:"tconstruct:iron"}'), molten_iron, FluidAmounts.INGOT*r.json.get('item_cost'), '#'+r.json.get('cast').get('tag').asString);
        casting(Item.of(part, '{Material:"tconstruct:copper"}'), molten_copper, FluidAmounts.INGOT*r.json.get('item_cost'), '#'+r.json.get('cast').get('tag').asString);
      }
    })
  }

  for(const mold of molds){
    e.forEachRecipe({ output: mold.toString() }, r => {
      var recipe = r.json.get("pattern")
      if(recipe != null){
        if(recipe.get("item") != null){
          for(const material of tcMaterials){
            if(mold.toString().includes('_red_sand_cast')){
              e.recipes.create.compacting([mold, Item.of(recipe.get("item"), '{Material:"tconstruct:' + material + '"}')], ['red_sand', Item.of(recipe.get("item"), '{Material:"tconstruct:' + material + '"}').strongNBT()]);
            } else {
              e.recipes.create.compacting([mold, Item.of(recipe.get("item"), '{Material:"tconstruct:' + material + '"}')], ['sand', Item.of(recipe.get("item"), '{Material:"tconstruct:' + material + '"}').strongNBT()]);
            }
          }
        } else {
          var tag = '#'+recipe.get("tag").asString
          for(const item of Ingredient.of(tag).itemIds){
            if(mold.toString().includes('_red_sand_cast')){
              e.recipes.create.compacting([mold, item], ['red_sand', item]);
            } else {
              e.recipes.create.compacting([mold, item], ['sand', item]);
            }
          }
        }
      }
    })
  }
})
