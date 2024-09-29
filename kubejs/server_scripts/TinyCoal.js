ServerEvents.recipes(e => {
    e.remove({output: '#c:coal_nuggets'})
    e.recipes.create.crushing(Item.of('tinycoal:tinycoal',8), 'minecraft:coal')
    e.recipes.create.crushing(Item.of('tinycoal:tinycharcoal',8), 'minecraft:charcoal')
})