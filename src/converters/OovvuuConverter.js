const OovvuuConverter = {
    type: 'oovvuunode',
    tagName: 'object',
    matchElement: function(el) {
        return el.is('object[type="x-oovvuu/oovvuu-embed"]')
    },

    import: function(el, node) {
        node.id = el.attr('id')
        node.embedId = el.find('embedId').text()
    },

    export: function(node, el, converter) {
        const $$ = converter.$$
        el.attr({
            id: node.id,
            type: 'x-oovvuu/oovvuu-embed',
        })

        el.append([
            $$('embedId').append(node.embedId)
        ])
    }
}

export {OovvuuConverter}
