<template>
  <div class="input">
    <box title="input" type="danger">
      <el-form
        :model="inputForm"
        :rules="rules"
        ref="inputForm"
        label-width="100px"
        class="demo-inputForm"
        size="mini"
        label-position="top"
      >
        <box title="必填" class="required">
          <el-form-item label="label" prop="label">
            <el-input v-model="inputForm.label"></el-input>
          </el-form-item>

          <el-form-item label="name" prop="model">
            <el-input v-model="inputForm.model"></el-input>
          </el-form-item>
        </box>

        <box title="属性" class="required">
          <el-form-item label="组件宽度">
            <el-slider v-model="inputForm.componentWidth" :max="24"></el-slider>
          </el-form-item>

          <el-form-item label="input类型">
            <el-select v-model="inputForm.type" placeholder="请选择类型">
              <el-option label="text" value="text"></el-option>
              <el-option label="textarea" value="textarea"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="输入框尺寸">
            <el-select v-model="inputForm.size" placeholder="请选择类型">
              <el-option label="medium" value="medium"></el-option>
              <el-option label="small" value="small"></el-option>
              <el-option label="mini" value="mini"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="最大长度">
            <el-input-number
              v-model.number="inputForm.maxlength"
            ></el-input-number>
          </el-form-item>

          <el-form-item label="最小长度">
            <el-input-number
              v-model.number="inputForm.minlength"
            ></el-input-number>
          </el-form-item>

          <el-form-item label="展示单词范围">
            <el-switch v-model="inputForm.showWordLimit"> </el-switch>
          </el-form-item>

          <el-form-item label="输入框占位文本">
            <el-input v-model="inputForm.placeholder"></el-input>
          </el-form-item>

          <el-form-item label="是否显示切换密码图标">
            <el-switch v-model="inputForm.showPassword"> </el-switch>
          </el-form-item>

          <el-form-item label="是否可清空">
            <el-switch v-model="inputForm.clearable"> </el-switch>
          </el-form-item>

          <el-form-item label="禁用">
            <el-switch v-model="inputForm.disabled"> </el-switch>
          </el-form-item>
        </box>

        <box title="校验规则" class="required">
          <el-form-item label="校验规则需要为JSON格式：" prop="rules">
            <el-input
              type="textarea"
              v-model="inputForm.rules"
              :rows="10"
            ></el-input>
          </el-form-item>

          <el-form-item label="JSON格式：" prop="rules">
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
          <el-button type="primary" @click="submitForm('inputForm')">
            立即创建
          </el-button>
          <el-button @click="resetForm('inputForm')">重置</el-button>
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
      inputForm: {
        label: "input",
        model: "input",
        type: "text",
        showWordLimit: false,
        disabled: false,
        clearable: false,
        showPassword: false,
        minlength: "",
        maxlength: "",
        size: "small",
        rules: "",
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
      return checkJson(this.inputForm.rules, ({ empty, success, fail }) => {
        if (empty) {
          return [];
        }

        if (success) {
          return JSON.parse(this.inputForm.rules);
        }

        if (fail) {
          return [];
        }
      });
    }
  },
  methods: {
    handleResult() {
      const { label, model, ...prop } = this.inputForm;

      for (let i in prop) {
        if (prop[i] === "") {
          delete prop[i];
        }
      }

      return {
        component: "el-input",
        props: prop,
        events: {},
        rule: this.JsonView,
        model: model,
        label: label
      };
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("submit", this.handleResult());
        } else {
          console.log("error submit!!");
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
.input {
  margin: 10px;
  height: 98%;
  box-sizing: border-box;
}

.required {
  margin: 20px 0;
}
</style>
