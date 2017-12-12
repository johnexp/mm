{
  "nome": {
    "modelProps": {
      "type": "String",
      "trim": true,
      "required": "[true, 'Por quê não há nome?']",
      "maxlength": "[200, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})']",
      "minlength": "[3, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})']"
    },
    "viewProps": {
      "name": "nome",
      "viewValue": "Nome",
      "fieldType": "text",
      "type": "string",
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
      "required": "[true, 'Por quê não há descrição?']",
      "maxlength": "[200, 'O valor excede a quantidade máxima de caracteres: ({MAXLENGTH})']",
      "minlength": "[5, 'O valor é menor que a quantidade mínima de caracteres: ({MINLENGTH})']"
    },
    "viewProps": {
      "name": "descricao",
      "viewValue": "Descrição",
      "fieldType": "textarea",
      "type": "string",
      "required": true,
      "showInput": true,
      "showFilter": true,
      "showColumn": true
    }
  },
  "definitivo": {
    "modelProps": {
      "type": "Boolean",
      "required": "[true, 'Por quê não dizer se é definitivo?']",
      "default": false
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
      "default": "Date.now",
      "max": "new Date('December 31, 2018 23:59:59')",
      "min": "new Date().setHours(0, 0, 0, 0)",
      "required": "'A data de início é obrigatória.'"
    },
    "viewProps": {
      "name": "dataInicio",
      "viewValue": "Data de Início",
      "fieldType": "date",
      "type": "Date",
      "min": "new Date",
      "max": "new Date('December 31, 2017 23:59:59')",
      "required": true,
      "showInput": true,
      "showFilter": true,
      "showColumn": true
    }
  },
  "quantidade": {
    "modelProps": {
      "type": "Number",
      "required": "'A quantidade é obrigatória'",
      "max": "[100, 'Quantidade superior ao limite']",
      "min": "[5, 'Quantidade inferior ao mínimo']",
      "get": "v => Math.round(v)",
      "set": "v => Math.round(v)"
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
      "default": "''",
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
      "type": "[{ type: String, enum: [null, 'Vermelho', 'Rosa', 'Azul', 'Verde', 'purple', 'orange', 'brown', 'yellow'] }]",
      "required": true
    },
    "viewProps": {
      "name": "cores",
      "viewValue": "Cores",
      "fieldType": "checkbox-multiple",
      "type": "string",
      "required": true,
      "showInput": true,
      "showFilter": true,
      "showColumn": true
    }
  },
  "selectCores": {
    "modelProps": {
      "type": "[{ type: String, enum: [null, 'Vermelho', 'Rosa', 'Azul', 'Verde', 'purple', 'orange', 'brown', 'yellow'] }]",
      "required": false
    },
    "viewProps": {
      "name": "selectCores",
      "viewValue": "Select Cores",
      "fieldType": "select",
      "type": "string",
      "required": false,
      "showInput": true,
      "showFilter": true,
      "showColumn": true
    }
  },
  "provisorio": {
    "modelProps": {
      "type": "Boolean",
      "required": "[true, 'Por quê não dizer se é provisório?']",
      "default": false
    },
    "viewProps": {
      "name": "provisorio",
      "viewValue": "Provisório?",
      "fieldType": "checkbox",
      "type": "boolean",
      "required": true,
      "showInput": true,
      "showFilter": true,
      "showColumn": true
    }
  },
  "membro": {
    "modelProps": {
      "type": "mongoose.Schema.ObjectId",
      "ref": "'Membro'",
      "required": "[false, 'Por quê não selecionar um \"Membro\"?']"
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
      "multiple": false,
      "required": false,
      "showInput": true,
      "showFilter": true,
      "showColumn": true
    }
  },
  "membros": {
    "modelProps": {
      "type": "[{ type: mongoose.Schema.ObjectId, ref: \"Membro\" }]",
      "required": "[false, 'Por quê não selecionar \"Membros\"?']"
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
  }
}
