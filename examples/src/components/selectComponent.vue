<template>
  <div class="select">
    <box title="select">
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
          <el-form-item label="是否多选">
            <el-switch v-model="ruleForm.multiple"> </el-switch>
          </el-form-item>

          <el-form-item label="禁用">
            <el-switch v-model="ruleForm.disabled"> </el-switch>
          </el-form-item>

          <el-form-item label="输入框尺寸">
            <el-select v-model="ruleForm.size" placeholder="请选择类型">
              <el-option label="medium" value="medium"></el-option>
              <el-option label="small" value="small"></el-option>
              <el-option label="mini" value="mini"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否可清空">
            <el-switch v-model="ruleForm.clearable"> </el-switch>
          </el-form-item>

          <div v-if="ruleForm.multiple">
            <el-form-item label="是否将选中值按文字的形式展示">
              <el-switch v-model="ruleForm.collapseTags"> </el-switch>
            </el-form-item>

            <el-form-item label="多选时用户最多可以选择的项目数">
              <el-input-number
                v-model="ruleForm.multipleLimit"
              ></el-input-number>
            </el-form-item>
          </div>

          <el-form-item label="输入框占位文本">
            <el-input v-model="ruleForm.placeholder"></el-input>
          </el-form-item>

          <el-form-item label="是否可搜索">
            <el-switch v-model="ruleForm.filterable"> </el-switch>
          </el-form-item>

          <el-form-item label="是否为远程搜索">
            <el-switch v-model="ruleForm.remote"> </el-switch>
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
        rules: "",
        multiple: false,
        disabled: false,
        size: "",
        clearable: false,
        collapseTags: false,
        multipleLimit: 0,
        placeholder: "",
        filterable: false,
        remote: false
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
        tag: "el-select",
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
.select {
  margin: 10px;
  height: 98%;
  box-sizing: border-box;
}

.required {
  margin: 20px 0;
}
</style>
