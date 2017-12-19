{
  "nome": {
    "modelProps": {
      "type": "String",
      "trim": true,
      "minlength": "[3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})']",
      "maxlength": "[200, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})']",
      "required": "[true, 'O campo \"Nome\" é obrigatório!']"
    },
    "viewProps": {
      "name": "nome",
      "viewValue": "Nome",
      "fieldType": "text",
      "type": "string",
      "minlength": "3",
      "maxlength": "200",
      "required": true,
      "showInput": true,
      "showFilter": true,
      "showColumn": true
    }
  },
  "descricao": {
    "modelProps": {
      "type": "String",
      "trim": true,
      "minlength": "[5, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})']",
      "maxlength": "[200, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})']",
      "required": "[true, 'O campo \"Descrição\" é obrigatório!']"
    },
    "viewProps": {
      "name": "descricao",
      "viewValue": "Descrição",
      "fieldType": "textarea",
      "type": "string",
      "minlength": "5",
      "maxlength": "200",
      "required": true,
      "showInput": true,
      "showFilter": true,
      "showColumn": true
    }
  },
  "definitivo": {
    "modelProps": {
      "type": "Boolean",
      "default": false,
      "required": "[true, 'O campo \"Definitivo?\" é obrigatório!']"
    },
    "viewProps": {
      "name": "definitivo",
      "viewValue": "Definitivo?",
      "fieldType": "switch",
      "type": "boolean",
      "required": true,
      "showInput": true,
      "showFilter": true,
      "showColumn": true
    }
  },
  "dataInicio": {
    "modelProps": {
      "type": "Date",
      "min": "[new Date().setHours(0, 0, 0, 0), 'A data é anterior à data mínima permitida: ({MIN})']",
      "max": "[new Date('2018-01-01T01:59:59.000Z'), 'A data é posterior à data máxima permitida: ({MAX})']",
      "default": "Date.now",
      "required": "[true, 'O campo \"Data de Início\" é obrigatório!']"
    },
    "viewProps": {
      "name": "dataInicio",
      "viewValue": "Data de Início",
      "fieldType": "date",
      "type": "date",
      "min": "new Date()",
      "max": "new Date('2018-01-01T01:59:59.000Z')",
      "required": true,
      "showInput": true,
      "showFilter": true,
      "showColumn": true
    }
  },
  "quantidade": {
    "modelProps": {
      "type": "Number",
      "min": "[5, 'O valor é menor que o mínimo permitido: ({MIN})']",
      "max": "[100, 'O valor é maior que o máximo permitido: ({MAX})']",
      "required": "[true, 'O campo \"Quantidade\" é obrigatório!']"
    },
    "viewProps": {
      "name": "quantidade",
      "viewValue": "Quantidade",
      "fieldType": "number",
      "type": "number",
      "min": "5",
      "max": "100",
      "required": true,
      "showInput": true,
      "showFilter": true,
      "showColumn": true
    }
  },
  "cor": {
    "modelProps": {
      "type": "String",
      "enum": "[null, 'Vermelho', 'Rosa', 'Azul', 'Verde', 'purple', 'orange', 'brown', 'yellow']"
    },
    "viewProps": {
      "name": "cor",
      "viewValue": "Cor",
      "fieldType": "radio",
      "type": "string",
      "required": false,
      "showInput": true,
      "showFilter": true,
      "showColumn": true
    }
  },
  "cores": {
    "modelProps": {
      "type": "[{ type: String, default: 'Vermelho', enum: ['Vermelho', 'Rosa', 'Azul', 'Verde', 'purple', 'orange', 'brown', 'yellow']}]",
      "required": "[true, 'O campo \"Cores\" é obrigatório!']"
    },
    "viewProps": {
      "name": "cores",
      "viewValue": "Cores",
      "fieldType": "checkbox-multiple",
      "type": "string",
      "multiple": true,
      "required": true,
      "showInput": true,
      "showFilter": true,
      "showColumn": true
    }
  },
  "selectCores": {
    "modelProps": {
      "type": "[{ type: String, enum: [null, 'Vermelho', 'Rosa', 'Azul', 'Verde', 'purple', 'orange', 'brown', 'yellow']}]"
    },
    "viewProps": {
      "name": "selectCores",
      "viewValue": "Select Cores",
      "fieldType": "select",
      "type": "string",
      "multiple": true,
      "required": false,
      "showInput": true,
      "showFilter": true,
      "showColumn": true
    }
  },
  "membro": {
    "modelProps": {
      "type": "mongoose.Schema.ObjectId",
      "ref": "'Membro'"
    },
    "populate": {
      "path": "membro",
      "select": "nome"
    },
    "viewProps": {
      "name": "membro",
      "viewValue": "Membro",
      "fieldType": "entity",
      "entityName": "Membro",
      "entityRoutePath": "membros",
      "mainEntityFieldName": "nome",
      "mainEntityFieldLabel": "Nome",
      "type": "entity",
      "required": false,
      "showInput": true,
      "showFilter": true,
      "showColumn": true
    }
  },
  "membros": {
    "modelProps": {
      "type": "[{ type: mongoose.Schema.ObjectId, ref: 'Membro'}]"
    },
    "populate": {
      "path": "membros",
      "select": "nome"
    },
    "viewProps": {
      "name": "membros",
      "viewValue": "Membros",
      "fieldType": "entity",
      "entityName": "Membro",
      "entityRoutePath": "membros",
      "mainEntityFieldName": "nome",
      "mainEntityFieldLabel": "Nome",
      "type": "entity",
      "multiple": true,
      "required": false,
      "showInput": true,
      "showFilter": true,
      "showColumn": false
    }
  },
  "documento": {
    "modelProps": {
      "type": "mongoose.Schema.ObjectId",
      "ref": "'File'",
      "required": "[true, 'O campo \"Documento\" é obrigatório!']"
    },
    "populate": {
      "path": "documento"
    },
    "viewProps": {
      "name": "documento",
      "viewValue": "Documento",
      "fieldType": "file",
      "entityName": "File",
      "type": "entity",
      "required": true,
      "showInput": true,
      "showFilter": true,
      "showColumn": false
    }
  },
  "imagem": {
    "modelProps": {
      "type": "mongoose.Schema.ObjectId",
      "ref": "'File'",
      "required": "[true, 'O campo \"Imagem\" é obrigatório!']"
    },
    "populate": {
      "path": "imagem"
    },
    "viewProps": {
      "name": "imagem",
      "viewValue": "Imagem",
      "fieldType": "image",
      "entityName": "File",
      "type": "entity",
      "required": true,
      "showInput": true,
      "showFilter": true,
      "showColumn": false
    }
  }
}