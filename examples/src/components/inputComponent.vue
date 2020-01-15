<template>
  <div class="input">
    <box title="input" type="danger">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        size="mini"
        label-position="top"
      >
        <box title="required" class="required">
          <el-form-item label="label" prop="label">
            <el-input v-model="ruleForm.label"></el-input>
          </el-form-item>

          <el-form-item label="name" prop="model">
            <el-input v-model="ruleForm.model"></el-input>
          </el-form-item>
        </box>

        <box title="props" class="required">
          <el-form-item label="type">
            <el-select v-model="ruleForm.type" placeholder="请选择类型">
              <el-option label="text" value="text"></el-option>
              <el-option label="textarea" value="textarea"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="输入框尺寸">
            <el-select v-model="ruleForm.size" placeholder="请选择类型">
              <el-option label="medium" value="medium"></el-option>
              <el-option label="small" value="small"></el-option>
              <el-option label="mini" value="mini"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="maxlength">
            <el-input-number v-model="ruleForm.maxlength"></el-input-number>
          </el-form-item>

          <el-form-item label="minlength">
            <el-input-number v-model="ruleForm.minlength"></el-input-number>
          </el-form-item>

          <el-form-item label="show-word-limit">
            <el-switch v-model="ruleForm.showWordLimit"> </el-switch>
          </el-form-item>

          <el-form-item label="输入框占位文本">
            <el-input v-model="ruleForm.placeholder"></el-input>
          </el-form-item>

          <el-form-item label="是否显示切换密码图标">
            <el-switch v-model="ruleForm.showPassword"> </el-switch>
          </el-form-item>

          <el-form-item label="是否可清空">
            <el-switch v-model="ruleForm.clearable"> </el-switch>
          </el-form-item>

          <el-form-item label="禁用">
            <el-switch v-model="ruleForm.disabled"> </el-switch>
          </el-form-item>
        </box>

        <el-form-item label="rules" prop="rules">
          <el-input type="textarea" v-model="ruleForm.rules"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">
            立即创建
          </el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </box>
  </div>
</template>
<script>
import box from "./box";
const checkRule = (rule, value, callback) => {
  if (!value) {
    return callback();
  }

  try {
    if (typeof JSON.parse(value) == "object") {
      return callback();
    }
  } catch (e) {
    return callback("输入内容必须为[{内容}]");
  }
};

export default {
  data() {
    return {
      ruleForm: {
        label: "",
        model: "",
        type: "text",
        showWordLimit: false,
        disabled: false,
        clearable: false,
        showPassword: false,
        minlength: "",
        maxlength: "",
        size: "small",
        rules: ""
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
  methods: {
    handleResult() {
      const { rules, label, model, ...prop } = this.ruleForm;

      for (let i in prop) {
        if (prop[i] === "") {
          delete prop[i];
        }
      }

      return {
        tag: "el-input",
        props: prop,
        events: {},
        rule: rules,
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
