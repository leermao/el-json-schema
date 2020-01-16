<template>
  <div class="about">
    <el-card class="box-card">
      <div class="setting">设置</div>
      <el-form ref="form" :model="form" label-width="150px" size="small">
        <el-col :span="8">
          <el-form-item label="表单类型">
            <el-radio-group v-model="form.type">
              <el-radio label="1">列表查询</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="表单内组件的尺寸">
            <el-select v-model="form.size" placeholder="表单内组件的尺寸">
              <el-option label="medium" value="medium"></el-option>
              <el-option label="small" value="small"></el-option>
              <el-option label="mini" value="mini"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="表单域标签的位置">
            <el-select
              v-model="form.labelPosition"
              placeholder="表单域标签的位置"
            >
              <el-option label="right" value="right"></el-option>
              <el-option label="left" value="left"></el-option>
              <el-option label="top" value="top"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="是否行内布局">
            <el-switch v-model="form.inline" active-color="#13ce66">
            </el-switch>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="label-width" style="width:100%">
            <el-slider v-model="form.labelWidth" :max="200"></el-slider>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="component-width" style="width:100%">
            <el-slider v-model="form.componentWidth" :max="24"></el-slider>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div class="setting">添加组件（点击添加）</div>
      <div>
        <el-button @click="handleDrawer('input')">
          input
          <i class="el-icon-plus"></i>
        </el-button>
        <el-button @click="handleDrawer('select')">
          select
          <i class="el-icon-plus"></i>
        </el-button>
        <el-button @click="handleDrawer('radio')">
          radio
          <i class="el-icon-plus"></i>
        </el-button>
        <el-button @click="handleDrawer('date-picker')">
          date-picker
          <i class="el-icon-plus"></i>
        </el-button>
        <el-button @click="handleDrawer('switch')">
          switch
          <i class="el-icon-plus"></i>
        </el-button>
      </div>
    </el-card>

    <el-card class="box-card">
      <div class="setting">当前组件UI</div>
      <el-row :gutter="30" v-if="schemas.length">
        <el-col :span="6">
          <div class="current-components">
            <draggable v-model="schemas">
              <div
                class="component"
                v-for="(item, index) in schemas"
                :key="index"
              >
                <div>
                  <div>标签: {{ item.tag }}</div>
                  <div>名称: {{ item.label }}</div>
                  <div>v-model: {{ item.model }}</div>
                </div>

                <i
                  class="el-icon-delete-solid"
                  @click="handleRemove(index)"
                ></i>
              </div>
            </draggable>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="current-ui">
            <el-form-shema
              :schemas="schemas"
              v-model="formValues"
              :config="config"
            ></el-form-shema>
          </div>
        </el-col>

        <el-col :span="3">
          <el-button type="warning" size="mini" @click="dialogVisible = true">
            使用
          </el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-drawer
      :visible.sync="drawer"
      :before-close="handleClose"
      size="70%"
      custom-class="drawer-content"
    >
      <input-component
        v-if="tag === 'input'"
        @submit="handleSubmit"
      ></input-component>

      <select-component v-if="tag === 'select'" @submit="handleSubmit">
      </select-component>

      <radio-component v-if="tag === 'radio'" @submit="handleSubmit">
      </radio-component>

      <switch-component v-if="tag === 'switch'" @submit="handleSubmit">
      </switch-component>

      <date-component v-if="tag === 'date-picker'" @submit="handleSubmit">
      </date-component>
    </el-drawer>

    <el-dialog :visible.sync="dialogVisible" width="50%" v-if="dialogVisible">
      <markdown
        :form="form"
        :schemas="schemas"
        :formValues="formValues"
      ></markdown>
    </el-dialog>
  </div>
</template>
<script>
import inputComponent from "../components/inputComponent.vue";
import selectComponent from "../components/selectComponent.vue";
import radioComponent from "../components/radioComponent.vue";
import dateComponent from "../components/dateComponent.vue";
import switchComponent from "../components/switchComponent.vue";

import markdown from "../components/markdown.vue";
import draggable from "vuedraggable";
export default {
  data() {
    return {
      tag: "",
      drawer: false,
      form: {
        type: "1",
        inline: true,
        labelWidth: 80,
        componentWidth: 24,
        size: "mini",
        labelPosition: ""
      },
      schemas: [],
      formValues: {},
      dialogVisible: false
    };
  },
  components: {
    inputComponent,
    markdown,
    selectComponent,
    radioComponent,
    dateComponent,
    switchComponent,
    draggable
  },
  computed: {
    config() {
      return { ...this.form, labelWidth: this.form.labelWidth + "px" };
    }
  },
  methods: {
    handleDrawer(tag) {
      this.tag = tag;
      this.drawer = true;
    },

    handleSubmit(data) {
      this.formValues[data.model] = "";
      this.schemas.push(data);

      this.handleClose();
    },

    handleClose() {
      this.drawer = false;
      this.tag = "";
    },

    handleRemove(index) {
      this.schemas.splice(index, 1);
    }
  }
};
</script>
<style lang="less">
.setting {
  font-size: 18px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  &::before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 24px;
    background: red;
    margin-right: 15px;
  }
}

.box-card {
  margin-bottom: 10px;
}

.drawer-content {
  overflow: scroll;
}

.current-components {
  border: 1px dashed #ddd;
  padding: 10px;

  .component {
    border-radius: 5px;
    background: #ddd;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
}

.current-ui {
  background: #ddd;
  margin-bottom: 5px;
  padding: 20px;
}
</style>
