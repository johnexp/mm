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
  }
}
