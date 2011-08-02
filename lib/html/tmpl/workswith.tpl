{{if resource.hasValuesForProperty("rel:worksWith") }}
  <p>
    Works with: 
    <ul>
      {{each resource.valuesForProperty("rel:worksWith") }}
        <li>{{tmpl({property: "foaf:knows", value: $value}) "propertyTemplate"}}</li>
      {{/each}}
    </ul>
  </p>
{{/if}}
