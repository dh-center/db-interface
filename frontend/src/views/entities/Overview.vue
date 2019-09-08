<template>
  <div class="entities-overview">
    <router-link
      class="link"
      :to="{name: `${entityName}-create`}"
    >
      Add new location
    </router-link>
    <router-link
      class="link"
      :to="{name: `${entityName}-changes`}"
    >
      View changes
    </router-link>
    <router-view :model="EntityModel" />
  </div>
</template>

<script>
  import PersonModel from '../../models/person';
  import LocationModel from '../../models/location';
  import RelationTypeModel from '../../models/relationType';
  import AddressModel from '../../models/address';

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
      }

      return {
        EntityModel
      };
    }
  };
</script>
