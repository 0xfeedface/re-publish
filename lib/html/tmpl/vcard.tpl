<div class="vcard" about="${resource.valuesForProperty("foaf:name")}" typeof="foaf:Person">
  <!-- Depiction -->
  {{if resource.hasValuesForProperty("foaf:depiction") }}
    <span rel="foaf:depiction">
      <img src="${resource.valuesForProperty("foaf:depiction")}" alt="depiction of ${resource.valuesForProperty("foaf:name")}"/>
    </span>
  {{/if}}
  <!-- Image -->
  {{if resource.hasValuesForProperty("foaf:img") }}
    <span rel="foaf:img">
      <img src="${resource.valuesForProperty("foaf:img")}" alt="image of ${resource.valuesForProperty("foaf:img")}"/>
    </span>
  {{/if}}
  <!-- Name -->
  {{if resource.hasValuesForProperty("foaf:name") }}
    <p>Name: <span rel="foaf:name">${resource.valuesForProperty("foaf:name")}</span></p>
  {{/if}}
  <!-- Birthday -->
  {{if resource.hasValuesForProperty("foaf:birthDate") }}
    <p>Day of birth: <span property="foaf:birthDate" datatype="xsd:date">${resource.valuesForProperty("foaf:birthDate")}</span></p>
  {{/if}}
  {{if resource.hasValuesForProperty("foaf:birthday") }}
    <p>Day of birth: <span property="foaf:birthday" datatype="xsd:date">${resource.valuesForProperty("foaf:birthday")}</span></p>
  {{/if}}
  <!-- Habitation -->
  {{if resource.hasValuesForProperty("foaf:based_near") }}
    <p>Habitation: <span property="foaf:based_near">${resource.valuesForProperty("foaf:based_near")}</span></p>
  {{/if}}
  <!-- Phone,Mailbox,Homepage -->
  {{if resource.hasValuesForProperty("foaf:phone") || resource.hasValuesForProperty("foaf:mbox") || 
       resource.hasValuesForProperty("foaf:homepage")  || resource.hasValuesForProperty("foaf:workInfoHomepage") || 
       resource.hasValuesForProperty("foaf:weblog") }}
    <p>
      <span class="block">
        {{if resource.hasValuesForProperty("foaf:phone")}}
          Phone: <a rel="foaf:phone" href="${resource.valuesForProperty("foaf:phone")}">${resource.valuesForProperty("foaf:phone")}</a>,
        {{/if}}
        {{if resource.hasValuesForProperty("foaf:mbox")}}
          <a rel="foaf:mbox" href="${resource.valuesForProperty("foaf:mbox")}">E-mail</a>,
        {{/if}}
        {{if resource.hasValuesForProperty("foaf:workInfoHomepage")}}
          <a rel="foaf:mbox" href="${resource.valuesForProperty("foaf:workInfoHomepage")}">Homepage(workInfo)</a>,
        {{/if}}        {{if resource.hasValuesForProperty("foaf:weblog")}}
          <a rel="foaf:mbox" href="${resource.valuesForProperty("foaf:weblog")}">Homepage(weblog)</a>,
        {{/if}}
        {{if resource.hasValuesForProperty("foaf:homepage")}}
          <a rel="foaf:homepage" href="${resource.valuesForProperty("foaf:homepage")}">Homepage</a>
        {{/if}}
      </span>
    </p>
  {{/if}}
  <!-- Workplace homepage -->
  {{if resource.hasValuesForProperty("foaf:workplaceHomepage")}}
    <p>
      Workplace Homepage: 
      <ul>
        {{each resource.valuesForProperty("foaf:workplaceHomepage") }}
          <li>{{tmpl({property: "foaf:workplaceHomepage", value: $value}) "propertyTemplate"}}</li>
        {{/each}}
      </ul>
    </p>
  {{/if}}

  <!-- Knows -->
  {{if resource.hasValuesForProperty("foaf:knows")}}
    <p>
      Knows: 
      <ul>
        {{each resource.valuesForProperty("foaf:knows") }}
          <li>{{tmpl({property: "foaf:knows", value: $value}) "propertyTemplate"}}</li>
        {{/each}}
      </ul>
    </p>
  {{/if}}
  <!-- Works with -->
  {{if resource.hasValuesForProperty("rel:worksWith")}}
    <p>
      worksWith: 
      <ul>
        {{each resource.valuesForProperty("rel:worksWith") }}
          <li>{{tmpl({property: "rel:worksWith", value: $value}) "propertyTemplate"}}</li>
        {{/each}}
      </ul>
    </p>
  {{/if}}
</div>

