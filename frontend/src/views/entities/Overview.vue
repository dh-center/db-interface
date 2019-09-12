<template>
  <div class="entities-overview">
    <router-link
      class="link"
      :to="{name: `${entityName}-create`}"
    >
      {{ $t(entityName+'.addNew') }}
    </router-link>
    <router-link
      class="link"
      :to="{name: `${entityName}-changes`}"
    >
      {{ $t('entities.viewChanges') }}
    </router-link>
    <router-view :model="EntityModel" />
  </div>
</template>

<script>
  import PersonModel from '../../models/person';
  import LocationModel from '../../models/location';
  import RelationTypeModel from '../../models/relationType';
  import AddressModel from '../../models/address';
  import RelationModel from '../../models/relation';

  export default {
    name: 'EntitiesOverview',
    props: {
      entityName: {
        type: String,
        required: true
      }
    },
    data() {
      let EntityModel;

      switch (this.entityName) {
      case 'persons':
        EntityModel = PersonModel;
        break;
      case 'locations':
        EntityModel = LocationModel;
        break;
      case 'addresses':
        EntityModel = AddressModel;
        break;
      case 'relationTypes':
        EntityModel = RelationTypeModel;
        break;
      case 'relations':
        EntityModel = RelationModel;
        break;
      }

      return {
        EntityModel
      };
    }
  };
</script>
