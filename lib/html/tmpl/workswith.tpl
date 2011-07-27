{{if resource.propertyValue("rel:worksWith") }}
  <p>
    Works with: 
    <ul>
      {{each resource.propertyValue("rel:worksWith") }}
        <li>{{tmpl($value) "test-resource"}}</li>
      {{/each}}
    </ul>
  </p>
{{/if}}
