ServerEvents.recipes(e => {
    e.recipes.create.mixing('gilded_blackstone',['#c:blackstone','#c:gold_ingots']).heated()
    e.recipes.create.mixing(['ancient_debris', 'ancient_debris', Item.of('ancient_debris').withChance(0.05)], ['gilded_blackstone', 'gilded_blackstone', '#c:netherrack', '#c:netherrack', '#c:basalt', '#c:basalt', 'ancient_debris', 'ancient_debris', Fluid.of('lava', FluidAmounts.B*5)]).superheated()
    e.recipes.create.filling('netherrack', [Fluid.of('water', FluidAmounts.MB*12), 'magma_block'])
    e.recipes.create.filling('magma_block', [Fluid.of('lava', FluidAmounts.MB*6), '#c:blackstone'])
})  