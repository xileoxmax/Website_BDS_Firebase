<template>
  <div>
    <el-form
      :label-position="labelPosition"
      :label-width="labelWidthForm"
      :model="model"
      :rules="rules"
      @submit.native.prevent="doSubmit"
      class="form"
      ref="form"
      v-if="model"
    >
      <el-form-item :label="fields.id.label" :prop="fields.id.name" v-if="isEditing">
        <el-col :lg="11" :md="16" :sm="24">
          <el-input :disabled="true" v-model="model[fields.id.name]" />
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.unitsTitle.label"
        :prop="fields.unitsTitle.name"
        :required="fields.unitsTitle.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-input v-model="model[fields.unitsTitle.name]" ref="focus" />
        </el-col>
      </el-form-item>
      <!-- :fetchFn="fields.productStall.fetchFn" -->

      <el-form-item
        :label="fields.productStall.label"
        :prop="fields.productStall.name"
        :required="fields.productStall.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <app-stall-autocomplete-input
            :mapperFn="fields.productStall.mapperFn"
            :showCreate="!modal"
            v-model="model[fields.productStall.name]"
            mode="multiple"
          ></app-stall-autocomplete-input>
        </el-col>
      </el-form-item>

      <el-form-item>
        <div class="form-buttons">
          <el-button
            :disabled="saveLoading"
            @click="doSubmit"
            icon="el-icon-fa-floppy-o"
            type="primary"
          >
            <app-i18n code="common.save"></app-i18n>
          </el-button>

          <el-button :disabled="saveLoading" @click="doReset" icon="el-icon-fa-undo">
            <app-i18n code="common.reset"></app-i18n>
          </el-button>

          <el-button :disabled="saveLoading" @click="doCancel" icon="el-icon-fa-close">
            <app-i18n code="common.cancel"></app-i18n>
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { FormSchema } from '@/shared/form/form-schema';
import { UnitsModel } from '@/modules/units/units-model';

const { fields } = UnitsModel;
const formSchema = new FormSchema([
  fields.id,
  fields.unitsTitle,
  fields.productStall,
]);

export default {
  name: 'app-units-form',

  props: ['isEditing', 'record', 'saveLoading', 'modal'],

  data() {
    return {
      rules: formSchema.rules(),
      model: null,
    };
  },

  created() {
    this.model = formSchema.initialValues(
      this.record || {},
    );
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
    }),

    fields() {
      return fields;
    },
  },

  methods: {
    doReset() {
      this.model = formSchema.initialValues(this.record);
    },

    doCancel() {
      this.$emit('cancel');
    },

    async doSubmit() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return;
      }

      const { id, ...values } = formSchema.cast(this.model);

      return this.$emit('submit', {
        id,
        values,
      });
    },
  },
};
</script>

<style></style>
