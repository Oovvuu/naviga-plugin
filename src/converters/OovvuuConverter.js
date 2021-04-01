const OovvuuConverter = {
  type: 'oovvuunode',
  tagName: 'object',
  matchElement(el) {
    return el.is('object[type="x-oovvuu/oovvuu-embed"]');
  },

  import(el, node) {
    /* eslint-disable no-param-reassign */
    node.id = el.attr('id');
    node.brightcoveAccountId = el.find('brightcoveAccountId').text();
    node.brightcovePlayerId = el.find('brightcovePlayerId').text();
    node.brightcoveVideoId = el.find('brightcoveVideoId').text();
    node.embedId = el.find('embedId').text();
    node.embed = el.find('embed').text();
  },

  export(node, el, converter) {
    const { $$ } = converter;
    el.attr({
      id: node.id,
      type: 'x-oovvuu/oovvuu-embed',
    });

    el.append([
      $$('data').append([
        $$('brightcoveAccountId').text(node.brightcoveAccountId),
        $$('brightcovePlayerId').text(node.brightcovePlayerId),
        $$('brightcoveVideoId').text(node.brightcoveVideoId),
        $$('embedId').text(node.embedId),
        $$('embed').text(node.embed),
      ]),
    ]);
  },
};

export default OovvuuConverter;
