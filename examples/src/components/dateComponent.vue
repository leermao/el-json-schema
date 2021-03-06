<template>
  <div class="date">
    <box title="date-picker" type="danger">
      <el-form
        :model="dateForm"
        :rules="rules"
        ref="dateForm"
        label-width="100px"
        class="demo-dateForm"
        size="mini"
        label-position="top"
      >
        <box title="必填" class="required">
          <el-form-item label="label" prop="label">
            <el-input v-model="dateForm.label"></el-input>
          </el-form-item>

          <el-form-item label="name" prop="model">
            <el-input v-model="dateForm.model"></el-input>
          </el-form-item>
        </box>

        <box title="属性" class="required">
          <el-form-item label="组件宽度">
            <el-slider v-model="dateForm.componentWidth" :max="24"></el-slider>
          </el-form-item>

          <el-form-item label="完全只读">
            <el-switch v-model="dateForm.readonly"> </el-switch>
          </el-form-item>

          <el-form-item label="禁用">
            <el-switch v-model="dateForm.disabled"> </el-switch>
          </el-form-item>

          <el-form-item label="文本框可输入">
            <el-switch v-model="dateForm.editable"> </el-switch>
          </el-form-item>

          <el-form-item label="是否显示清除按钮">
            <el-switch v-model="dateForm.clearable"> </el-switch>
          </el-form-item>

          <el-form-item label="输入框尺寸">
            <el-select v-model="dateForm.size" placeholder="请选择类型">
              <el-option label="medium" value="medium"></el-option>
              <el-option label="small" value="small"></el-option>
              <el-option label="mini" value="mini"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="输入框占位文本">
            <el-input v-model="dateForm.placeholder"></el-input>
          </el-form-item>

          <el-form-item label="type">
            <el-select v-model="dateForm.type" placeholder="请选择类型">
              <el-option label="year" value="year"></el-option>
              <el-option label="month" value="month"></el-option>
              <el-option label="date" value="date"></el-option>
              <el-option label="dates" value="dates"></el-option>
              <el-option label="week" value="week"></el-option>
              <el-option label="datetime" value="datetime"></el-option>
              <el-option
                label="datetimerange"
                value="datetimerange"
              ></el-option>
              <el-option label="daterange" value="daterange"></el-option>
              <el-option label="monthrange" value="monthrange"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="显示在输入框中的格式">
            <el-input v-model="dateForm.format"></el-input>
          </el-form-item>

          <el-form-item label="可选，绑定值的格式">
            <el-input v-model="dateForm.valueFormat"></el-input>
          </el-form-item>

          <el-form-item label="对齐方式">
            <el-select v-model="dateForm.align" placeholder="请选择类型">
              <el-option label="left" value="left"></el-option>
              <el-option label="center" value="center"></el-option>
              <el-option label="right" value="right"></el-option>
            </el-select>
          </el-form-item>
        </box>

        <box title="校验规则" class="required">
          <el-form-item
            label="校验规则需要为JSON格式： （key值需要加双引号）"
            prop="rules"
          >
            <el-input
              type="textarea"
              v-model="dateForm.rules"
              :rows="10"
            ></el-input>
          </el-form-item>

          <el-form-item label="转为JSON格式为：" prop="rules">
            <json-viewer :value="JsonView"></json-viewer>
          </el-form-item>

          <el-form-item label="例子：" prop="rules">
            <pre>{{
              JSON.stringify(
                [
                  {
                    required: true,
                    message: "请输入活动名称",
                    trigger: "blur"
                  },
                  {
                    min: 3,
                    max: 5,
                    message: "长度在 3 到 5 个字符",
                    trigger: "blur"
                  }
                ],
                null,
                4
              )
            }}</pre>
          </el-form-item>
        </box>

        <el-form-item>
          <el-button type="primary" @click="submitForm('dateForm')">
            立即创建
          </el-button>
          <el-button @click="resetForm('dateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </box>
  </div>
</template>
<script>
import box from "./box";
import { checkJson } from "../utils/index";
const checkRule = (rule, value, callback) => {
  return checkJson(value, ({ empty, success, fail }) => {
    if (empty) {
      return callback();
    }

    if (success) {
      return callback();
    }

    if (fail) {
      return callback("输入内容必须为JSON内容");
    }
  });
};

export default {
  data() {
    return {
      dateForm: {
        label: "date",
        model: "date",
        rules: "",
        readonly: false,
        disabled: false,
        editable: true,
        clearable: true,
        size: "small",
        placeholder: "",
        type: "date",
        format: "",
        valueFormat: "",
        align: "",
        componentWidth: 24
      },
      rules: {
        label: [{ required: true, message: "请输入label", trigger: "blur" }],
        model: [{ required: true, message: "请输入model", trigger: "blur" }],
        rules: [{ validator: checkRule, trigger: "blur" }]
      }
    };
  },
  components: {
    box
  },
  computed: {
    JsonView() {
      return checkJson(this.dateForm.rules, ({ empty, success, fail }) => {
        if (empty) {
          return [];
        }

        if (success) {
          return JSON.parse(this.dateForm.rules);
        }

        if (fail) {
          return [];
        }
      });
    }
  },
  methods: {
    handleResult() {
      const { label, model, ...prop } = this.dateForm;

      for (let i in prop) {
        if (prop[i] === "") {
          delete prop[i];
        }
      }

      return {
        component: "el-date-picker",
        props: prop,
        events: {},
        rule: this.JsonView,
        model,
        label
      };
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("submit", this.handleResult());
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped lang="less">
.date {
  margin: 10px;
  height: 98%;
  box-sizing: border-box;
}

.required {
  margin: 20px 0;
}
</style>
