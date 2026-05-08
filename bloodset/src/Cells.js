const cellInfo = {
  lymphocyte: {
    name: "Lymphocyte",
    description: "A type of white blood cell responsible for immune response.",
    function:
      "Helps fight infections by producing antibodies and killing infected cells.",
    note:
      "This is a normal immune cell. Abnormal counts may require medical analysis.",
    range: "20-40%",
    problems:
      "Abnormal lymphocyte levels may indicate viral infections, leukemia, immune disorders, or chronic inflammation.",
    remedies: [
      "Eat a healthy diet with fruits, vegetables, protein, and enough fluids to support immunity.",
      "Get proper sleep, regular exercise, and manage stress.",
      "Avoid smoking/alcohol and treat infections promptly.",
    ],
  },

  neutrophil: {
    name: "Neutrophil",
    description: "Most abundant white blood cell.",
    function: "First line of defense against infections.",
    note: "Normal cell; high levels may indicate infection.",
    range: "40-80%",
    problems:
      "Abnormal neutrophil counts may indicate bacterial infections, inflammation, stress, or bone marrow disorders.",
    remedies: [
      "Eat a balanced diet rich in protein, fruits, and vegetables.",
      "Maintain good hygiene and proper sleep.",
      "Avoid smoking/alcohol and manage stress.",
    ],
  },

  eosinophil: {
    name: "Eosinophil",
    description: "White blood cell involved in allergic reactions.",
    function: "Fights parasites and contributes to allergy responses.",
    note: "High levels may indicate allergies or parasitic infections.",
    range: "1-6%",
    problems:
      "High eosinophil levels may indicate asthma, allergies, skin diseases, or parasitic infections.",
    remedies: [
      "Avoid allergy triggers like dust and smoke.",
      "Eat nutritious foods and stay hydrated.",
      "Treat allergies or infections on time.",
    ],
  },

  basophil: {
    name: "Basophil",
    description: "Rare white blood cell.",
    function: "Releases histamine during allergic reactions.",
    note: "Associated with inflammation and allergies.",
    range: "0-2%",
    problems:
      "Abnormal basophil levels may indicate allergies, inflammation, thyroid disorders, or blood diseases.",
    remedies: [
      "Eat a balanced diet and drink enough water.",
      "Sleep properly and reduce stress.",
      "Manage allergies and infections early.",
    ],
  },

  monocyte: {
    name: "Monocyte",
    description: "Largest white blood cell.",
    function: "Engulfs pathogens and dead cells.",
    note: "Important for immune defense.",
    range: "2-10%",
    problems:
      "High monocyte levels may indicate chronic infections, autoimmune diseases, or inflammatory disorders.",
    remedies: [
      "Eat nutritious foods and stay hydrated.",
      "Exercise regularly and sleep well.",
      "Avoid smoking/alcohol and treat infections.",
    ],
  },

  ig: {
    name: "Immature Granulocyte",
    description: "Young white blood cells.",
    function: "Indicates bone marrow activity.",
    note: "Elevated levels may indicate infection or stress.",
    range: "1-5%",
    problems:
      "High immature granulocyte levels may indicate severe infections, inflammation, or bone marrow stress.",
    remedies: [
      "Maintain a healthy diet and hydration.",
      "Reduce stress and sleep properly.",
      "Seek medical advice if symptoms continue.",
    ],
  },

  erythroblast: {
    name: "Erythroblast",
    description: "Immature red blood cell.",
    function: "Develops into red blood cells.",
    note: "Presence in blood may require clinical attention.",
    range: "0 per 100 white blood cells%",
    problems:
      "Abnormal erythroblast levels may indicate anemia, bone marrow disorders, or severe blood loss.",
    remedies: [
      "Eat iron-, vitamin B12-, and folate-rich foods.",
      "Avoid smoking/alcohol and stay hydrated.",
      "Consult a doctor if blood counts remain abnormal.",
    ],
  },

  platelet: {
    name: "Platelet",
    description: "Cell fragment involved in clotting.",
    function: "Helps stop bleeding.",
    note: "Essential for wound healing.",
    range: "150-450x1000/uL",
    problems:
      "Low or high platelet counts may cause bleeding disorders, clotting problems, or infections.",
    remedies: [
      "Eat iron- and vitamin-rich foods.",
      "Avoid smoking, alcohol, and junk food.",
      "Consult a doctor if bruising or bleeding occurs.",
    ],
  },
};

export default cellInfo;