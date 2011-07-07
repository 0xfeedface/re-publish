<div class="vcard" about="" typeof="foaf:Person">
  {{if resource.hasValuesForProperty("foaf:depiction") }}
  <span rel="foaf:depiction">
    <img src="${resource.valuesForProperty("foaf:depiction")}" alt="depiction of ${resource.valuesForProperty("foaf:name")}"/>
  </span>
  {{/if}}
  {{if resource.hasValuesForProperty("foaf:name") }}
    <p>Name: <span rel="foaf:name">${resource.valuesForProperty("foaf:name")}</span></p>
  {{/if}}
  {{if resource.hasValuesForProperty("foaf:birthDate") }}
    <p>Day of birth: <span property="foaf:birthDate" datatype="xsd:date">${resource.valuesForProperty("foaf:birthDate")}</span></p>
  {{/if}}
  {{if resource.hasValuesForProperty("foaf:phone") || resource.hasValuesForProperty("foaf:mbox") || resource.hasValuesForProperty("foaf:homepage")}}
    <p>
      <span class="block">
        {{if resource.hasValuesForProperty("foaf:phone")}}
        Phone: <a rel="foaf:phone" href="${resource.valuesForProperty("foaf:phone")}">${resource.valuesForProperty("foaf:phone")}</a>,
        {{/if}}
        {{if resource.hasValuesForProperty("foaf:mbox")}}
        <a rel="foaf:mbox" href="${resource.valuesForProperty("foaf:mbox")}">E-mail</a>,
        {{/if}}
        {{if resource.hasValuesForProperty("foaf:homepage")}}
        <a rel="foaf:homepage" href="${resource.valuesForProperty("foaf:homepage")}">Homepage</a>
        {{/if}}
      </span>
    </p>
  {{/if}}
  {{if resource.hasValuesForProperty("foaf:knows")}}
    <p>
      Knows: 
      <ul>
        {{each resource.valuesForProperty("foaf:knows") }}
          <li>{{tmpl($value) "test-resource"}}</li>
        {{/each}}
      </ul>
    </p>
  {{/if}}
  {{if typeof($.template("workswith"))=="function" }}{{tmpl "workswith"}}{{/if}}
</div>

