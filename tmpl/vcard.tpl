<div class="vcard" about="${resource.URI()}" typeof="foaf:Person">
  {{if resource.propertyValue("foaf:depiction") }}
  <span rel="foaf:depiction">
    <img src="${resource.propertyValue("foaf:depiction")}" alt="depiction of ${resource.propertyValue("foaf:name")}"/>
  </span>
  {{/if}}
  {{if resource.propertyValue("foaf:name") }}
    <p>Name: <span rel="foaf:name">${resource.propertyValue("foaf:name")}</span></p>
  {{/if}}
  {{if resource.propertyValue("foaf:birthDate") }}
    <p>Day of birth: <span property="foaf:birthDate" datatype="xsd:date">${resource.propertyValue("foaf:birthDate")}</span></p>
  {{/if}}
  {{if resource.propertyValue("foaf:phone") || resource.propertyValue("foaf:mbox") || resource.propertyValue("foaf:homepage")}}
    <p>
      <span class="block">
        {{if resource.propertyValue("foaf:phone")}}
        Phone: <a rel="foaf:phone" href="${resource.propertyValue("foaf:phone")}">${resource.propertyValue("foaf:phone")}</a>,
        {{/if}}
        {{if resource.propertyValue("foaf:mbox")}}
        <a rel="foaf:mbox" href="${resource.propertyValue("foaf:mbox")}">E-mail</a>,
        {{/if}}
        {{if resource.propertyValue("foaf:homepage")}}
        <a rel="foaf:homepage" href="${resource.propertyValue("foaf:homepage")}">Homepage</a>
        {{/if}}
      </span>
    </p>
  {{/if}}
  {{if resource.propertyValue("foaf:knows")}}
    <p>
      Knows: 
      <ul>
        {{each resource.propertyValue("foaf:knows") }}
          <li>{{tmpl($value) "test-resource"}}</li>
        {{/each}}
      </ul>
    </p>
  {{/if}}
  {{if typeof($.template("workswith"))=="function" }}{{tmpl "workswith"}}{{/if}}
</div>
