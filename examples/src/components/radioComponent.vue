<template>
  <div class="radio">
    <box title="radio" type="danger">
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
          <el-form-item label="是否显示边框">
            <el-switch v-model="ruleForm.border"> </el-switch>
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
        </box>

        <box title="options" class="required">
          <el-select
            v-model="selectForm.optionType"
            placeholder="请选择类型"
            size="small"
            style="margin-bottom: 10px"
          >
            <el-option label="array" value="array"></el-option>
            <el-option label="object" value="object"></el-option>
          </el-select>

          <el-form-item v-for="(item, index) in options" :key="index">
            <el-col :span="2">
              Key:
            </el-col>
            <el-col :span="8">
              <el-input v-model="options[index].value"></el-input>
            </el-col>
            <el-col :span="2">
              Value:
            </el-col>
            <el-col :span="8">
              <el-input v-model="options[index].label"></el-input>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-button
                @click="handleAddOption(options[index])"
                icon="el-icon-plus"
                circle
              ></el-button>
              <el-button
                @click="handleMvOption(index)"
                icon="el-icon-minus"
                circle
              ></el-button>
            </el-col>
          </el-form-item>
        </box>

        <box title="required" class="required">
          <el-form-item label="label" prop="label">
            <el-input v-model="ruleForm.label"></el-input>
          </el-form-item>

          <el-form-item label="name" prop="model">
            <el-input v-model="ruleForm.model"></el-input>
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
        options: [],
        optionType: "array",
        label: "",
        model: "",
        size: "small",
        rules: "",
        border: false,
        disabled: false
      },
      rules: {
        label: [{ required: true, message: "请输入label", trigger: "blur" }],
        model: [{ required: true, message: "请输入model", trigger: "blur" }],
        rules: [{ validator: checkRule, trigger: "blur" }]
      },
      options: [
        {
          label: "",
          value: ""
        }
      ]
    };
  },
  components: {
    box
  },
  methods: {
    handleResult() {
      if (this.selectForm.optionType === "array") {
        this.selectForm.options = [...this.options];
      } else {
        this.selectForm.options = {};
        this.options.map(item => {
          this.selectForm.options[item.value] = item.label;
        });
      }
      const { rules, label, model, options, ...prop } = this.ruleForm;

      for (let i in prop) {
        if (prop[i] === "") {
          delete prop[i];
        }
      }

      return {
        tag: "el-radio",
        props: prop,
        events: {},
        rule: rules,
        model,
        label,
        options
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

    handleAddOption({ label, value }) {
      if (label && value) {
        this.options.push({
          label: "",
          value: ""
        });
      }
    },

    handleMvOption(index) {
      this.options.splice(index, 1);
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped lang="less">
.radio {
  margin: 10px;
  height: 98%;
  box-sizing: border-box;
}

.required {
  margin: 20px 0;
}
</style>
