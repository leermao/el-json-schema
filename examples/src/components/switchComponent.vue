<template>
  <div class="switch">
    <box title="switch" type="danger">
      <el-form
        :model="switchForm"
        :rules="rules"
        ref="switchForm"
        label-width="100px"
        class="demo-switchForm"
        size="mini"
        label-position="top"
      >
        <box title="必填" class="required">
          <el-form-item label="label" prop="label">
            <el-input v-model="switchForm.label"></el-input>
          </el-form-item>

          <el-form-item label="name" prop="model">
            <el-input v-model="switchForm.model"></el-input>
          </el-form-item>
        </box>

        <box title="属性" class="required">
          <el-form-item label="组件宽度">
            <el-slider
              v-model="switchForm.componentWidth"
              :max="24"
            ></el-slider>
          </el-form-item>

          <el-form-item label="禁用">
            <el-switch v-model="switchForm.disabled"> </el-switch>
          </el-form-item>

          <el-form-item label="switch 的宽度（像素）">
            <el-input-number v-model="switchForm.width"></el-input-number>
          </el-form-item>

          <el-form-item label="switch 打开时的文字描述">
            <el-input v-model="switchForm.activeText"></el-input>
          </el-form-item>

          <el-form-item label="switch 关闭时的文字描述">
            <el-input v-model="switchForm.inactiveText"></el-input>
          </el-form-item>

          <el-form-item label="switch 打开时的背景色">
            <el-color-picker v-model="switchForm.activeColor"></el-color-picker>
          </el-form-item>

          <el-form-item label="switch 关闭时的背景色">
            <el-color-picker
              v-model="switchForm.inactiveColor"
            ></el-color-picker>
          </el-form-item>
        </box>

        <box title="校验规则" class="required">
          <el-form-item label="校验规则" prop="rules">
            <el-input type="textarea" v-model="switchForm.rules"></el-input>
          </el-form-item>
        </box>

        <el-form-item>
          <el-button type="primary" @click="submitForm('switchForm')">
            立即创建
          </el-button>
          <el-button @click="resetForm('switchForm')">重置</el-button>
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
    const val = JSON.parse(value);
    if (Array.isArray(val) && typeof val == "object") {
      return callback();
    } else {
      return callback("输入内容必须为JSON内容");
    }
  } catch (e) {
    return callback("输入内容必须为JSON内容");
  }
};

export default {
  data() {
    return {
      switchForm: {
        label: "switch",
        model: "switch",
        rules: "",
        disabled: false,
        width: 40,
        activeText: "",
        inactiveText: "",
        activeColor: "#409EFF",
        inactiveColor: "#C0CCDA",
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
  methods: {
    handleResult() {
      const { rules, label, model, ...prop } = this.switchForm;

      for (let i in prop) {
        if (prop[i] === "") {
          delete prop[i];
        }
      }

      return {
        component: "el-switch",
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
.switch {
  margin: 10px;
  height: 98%;
  box-sizing: border-box;
}

.required {
  margin: 20px 0;
}
</style>
