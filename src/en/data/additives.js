// Ingredient guide for shopping: E-numbers and German terms that can hide pork,
// animal gelatine or alcohol.
//
// status: 'avoid'  = usually animal or haram source
//         'check'  = can be plant or animal; check the source or certificate
//         'insect' = insect source; scholars differ
//         'ok'     = usually plant-based or synthetic
// Religious opinions differ; a "vegan" label or a halal certificate is the safest sign.

export const statusInfo = {
  avoid: { label: 'Avoid', text: 'Usually animal or pork source', color: '#e5484d', bg: 'rgba(229,72,77,0.14)' },
  check: { label: 'Check', text: 'Can be plant or animal', color: '#f5a524', bg: 'rgba(245,165,36,0.14)' },
  insect: { label: 'Insect', text: 'Insect source; opinions differ', color: '#b388ff', bg: 'rgba(179,136,255,0.14)' },
  ok: { label: 'Usually fine', text: 'Usually plant-based or synthetic', color: '#30a46c', bg: 'rgba(48,164,108,0.14)' },
}

export const eNumbers = [
  { code: 'Gelatine', de: 'Gelatine / Speisegelatine', name: 'Gelatine', status: 'avoid', text: 'In Germany usually from pork unless it says Rindergelatine, Fischgelatine or Halal-Gelatine. It has no E-number because it counts as a food (formerly E441).', where: 'Gummy sweets, yoghurt, cream, chilled cakes, capsules' },
  { code: 'E120', de: 'Karmin / Echtes Karmin / Cochenille', name: 'Carmine (cochineal)', status: 'insect', text: 'A red dye made from cochineal insects.', where: 'Red drinks, sweets, fruit yoghurt, sausages' },
  { code: 'E422', de: 'Glycerin', name: 'Glycerol', status: 'check', text: 'Can come from plant oils or animal fat.', where: 'Sweets, chewing gum, baked goods' },
  { code: 'E470a', de: 'Salze der Speisefettsäuren', name: 'Salts of fatty acids', status: 'check', text: 'From plant or animal fats.', where: 'Processed foods, supplements' },
  { code: 'E470b', de: 'Magnesiumsalze der Speisefettsäuren', name: 'Magnesium salts of fatty acids', status: 'check', text: 'From plant or animal fats.', where: 'Tablets, spices' },
  { code: 'E471', de: 'Mono- und Diglyceride von Speisefettsäuren', name: 'Mono- and diglycerides', status: 'check', text: 'One of the most common emulsifiers. Can be made from pork fat or plant oils. If it does not say "pflanzlich", check.', where: 'Packaged bread, ice cream, chocolate, cakes, margarine' },
  { code: 'E472a–f', de: 'Ester von Mono- und Diglyceriden', name: 'Esters of mono- and diglycerides', status: 'check', text: 'Derived from E471, so the fat source can be animal.', where: 'Baked goods, creams, sweets' },
  { code: 'E473–E477', de: 'Zuckerester / Polyglycerinester', name: 'Sugar and polyglycerol esters', status: 'check', text: 'Built on fatty acids that can be animal.', where: 'Sweets, whipped toppings, baked goods' },
  { code: 'E481–E483', de: 'Stearoyllactylate / Stearyltartrat', name: 'Stearoyl lactylates', status: 'check', text: 'Built on stearic acid, which can be animal.', where: 'Bread, toast, doughs' },
  { code: 'E491–E495', de: 'Sorbitanester', name: 'Sorbitan esters', status: 'check', text: 'Built on fatty acids that can be animal.', where: 'Dry yeast, coatings, sweets' },
  { code: 'E432–E436', de: 'Polysorbate', name: 'Polysorbates', status: 'check', text: 'Built on fatty acids that can be animal.', where: 'Ice cream, sauces, sweets' },
  { code: 'E542', de: 'Knochenphosphat', name: 'Bone phosphate', status: 'avoid', text: 'Extracted from animal bones.', where: 'Anti-caking agent in some foods' },
  { code: 'E570', de: 'Fettsäuren / Stearinsäure', name: 'Fatty acids (stearic acid)', status: 'check', text: 'From plant or animal fats.', where: 'Chewing gum, sweets, tablets' },
  { code: 'E572', de: 'Magnesiumstearat', name: 'Magnesium stearate', status: 'check', text: 'Can be animal or plant-based.', where: 'Tablets, supplements, pressed sweets' },
  { code: 'E627 / E631 / E635', de: 'Guanylat / Inosinat / Ribonukleotide', name: 'Flavour enhancers', status: 'check', text: 'Usually made by fermentation, sometimes from meat or fish.', where: 'Crisps, instant soups, stock, seasonings' },
  { code: 'E904', de: 'Schellack', name: 'Shellac', status: 'insect', text: 'A glaze secreted by the lac insect.', where: 'Glazing sweets, fruit and tablets' },
  { code: 'E920', de: 'L-Cystein', name: 'L-cysteine', status: 'check', text: 'A flour improver; can come from feathers or animal hair, or be synthetic.', where: 'Industrial bread and cakes' },
  { code: 'E322', de: 'Lecithin', name: 'Lecithin', status: 'ok', text: 'Usually from soy or sunflower (rarely from egg).', where: 'Chocolate, baked goods' },
  { code: 'E440', de: 'Pektin', name: 'Pectin', status: 'ok', text: 'A plant gelling agent from apples and citrus.', where: 'Jams, vegan gummy sweets' },
  { code: 'E406', de: 'Agar-Agar', name: 'Agar', status: 'ok', text: 'A gelling agent from seaweed.', where: 'Vegan desserts, pudding' },
  { code: 'E407', de: 'Carrageen', name: 'Carrageenan', status: 'ok', text: 'From red seaweed.', where: 'Flavoured milk, pudding, cream' },
  { code: 'E410 / E412', de: 'Johannisbrotkernmehl / Guarkernmehl', name: 'Locust bean and guar gum', status: 'ok', text: 'Plant thickeners from seeds.', where: 'Ice cream, sauces, dairy' },
  { code: 'E901', de: 'Bienenwachs', name: 'Beeswax', status: 'ok', text: 'From bees; considered halal by most scholars.', where: 'Glazing sweets and fruit' },
]

export const hiddenTerms = [
  { de: 'Schweinefleisch / Schwein', ar: 'Pork / pig', status: 'avoid', text: 'Obvious, but it turns up in unexpected places: sauces, soups and frozen pizza.' },
  { de: 'Speck / Schinken', ar: 'Bacon / ham', status: 'avoid', text: 'Common in salads, pastries and quiche.' },
  { de: 'Schmalz / Schweineschmalz', ar: 'Lard (pork fat)', status: 'avoid', text: 'Used in some bakeries, fryers and traditional pastries.' },
  { de: 'Gelatine / Speisegelatine', ar: 'Gelatine / food gelatine', status: 'avoid', text: 'Usually pork. Safe: Rindergelatine (halal beef), Fischgelatine (fish), Halal-Gelatine.' },
  { de: 'Ethylalkohol / Alkohol / Weingeist', ar: 'Ethyl alcohol / alcohol', status: 'avoid', text: 'Sometimes sprayed on packaged bread and toast to keep it fresh, and found in some sweets and creams.' },
  { de: 'Rum / Weinbrand / Likör / Kirschwasser', ar: 'Rum / brandy / liqueur', status: 'avoid', text: 'In filled chocolates (Mon Chéri), rum balls (Rumkugeln), Black Forest cake and Christmas cakes.' },
  { de: 'Aroma (in Alkohol gelöst)', ar: 'Flavouring (dissolved in alcohol)', status: 'check', text: 'Some flavourings are carried in alcohol. The amount is tiny and opinions differ.' },
  { de: 'tierisches Fett / Tierfett', ar: 'Animal fat', status: 'check', text: 'The animal is not stated. Avoid it unless the source is named.' },
  { de: 'Lab / tierisches Lab', ar: 'Animal rennet (in cheese)', status: 'check', text: 'Usually from calf stomach. Safe: mikrobielles Lab or "vegetarisch" on the cheese.' },
  { de: 'Molke / Molkenpulver', ar: 'Whey / whey powder', status: 'check', text: 'From milk, but may be made with animal rennet.' },
  { de: 'Kollagen', ar: 'Collagen', status: 'avoid', text: 'From animal skin or bones, often pork. In sausage casings and some supplements.' },
  { de: 'Bier / Wein (in Soße, Brot)', ar: 'Beer / wine (in sauce, bread)', status: 'avoid', text: 'Some breads (Bierbrot), sauces and mustards contain beer or wine.' },
  { de: 'vegan', ar: 'Vegan', status: 'ok', text: 'No animal ingredients at all. The easiest sign for safe shopping (but watch for alcohol).' },
  { de: 'pflanzlich / vegetarisch', ar: 'Plant-based / vegetarian', status: 'ok', text: '"vegetarisch" can contain milk and eggs, but no meat or gelatine.' },
]

export const gelling = {
  plant: {
    title: 'Plant gelling agents',
    de: 'Pflanzliches Geliermittel',
    status: 'ok',
    text: 'Made from plants and seaweed, and safe. Look for these words on sweets, jams and puddings:',
    list: ['Pektin (E440): from apples and citrus', 'Agar-Agar (E406): from seaweed', 'Carrageen (E407): from red seaweed', 'Johannisbrotkernmehl (E410): from carob seeds', 'Stärke: corn or potato starch'],
  },
  animal: {
    title: 'Animal gelatine',
    de: 'Speisegelatine',
    status: 'avoid',
    text: 'Made from animal skin and bones. In Germany most of it is pork, and a little is beef that is not halal-slaughtered:',
    list: ['Gelatine / Speisegelatine: usually pork', 'Schweinegelatine: definitely pork', 'Rindergelatine: beef (not necessarily halal)', 'Halal-Gelatine: the certified halal option', 'Fischgelatine: from fish, fine for most scholars'],
  },
}

export const shoppingTips = [
  'Safe signs: "vegan", a certified "Halal" logo, or "ohne Gelatine" (without gelatine).',
  'Halal gummy sweets (such as Haribo Halal) are sold in Turkish and Arab shops, and sometimes in big supermarkets.',
  'The camera mode in Google Translate translates an ingredient list instantly.',
  'Ask at the bakery: "Ist da Schmalz oder Alkohol drin?" (Is there lard or alcohol in it?)',
  'Organic (Bio) products are not necessarily halal. Always read the ingredients.',
]
