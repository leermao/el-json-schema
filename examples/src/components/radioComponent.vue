<template>
  <div class="radio">
    <box title="radio" type="danger">
      <el-form
        :model="radioForm"
        :rules="rules"
        ref="radioForm"
        label-width="100px"
        class="demo-radioForm"
        size="mini"
        label-position="top"
      >
        <box title="必填" class="required">
          <el-form-item label="label" prop="label">
            <el-input v-model="radioForm.label"></el-input>
          </el-form-item>

          <el-form-item label="name" prop="model">
            <el-input v-model="radioForm.model"></el-input>
          </el-form-item>
        </box>

        <box title="属性" class="required">
          <el-form-item label="组件宽度">
            <el-slider v-model="radioForm.componentWidth" :max="24"></el-slider>
          </el-form-item>

          <el-form-item label="是否显示边框">
            <el-switch v-model="radioForm.border"> </el-switch>
          </el-form-item>

          <el-form-item label="禁用">
            <el-switch v-model="radioForm.disabled"> </el-switch>
          </el-form-item>

          <el-form-item label="输入框尺寸">
            <el-select v-model="radioForm.size" placeholder="请选择类型">
              <el-option label="medium" value="medium"></el-option>
              <el-option label="small" value="small"></el-option>
              <el-option label="mini" value="mini"></el-option>
            </el-select>
          </el-form-item>
        </box>

        <box title="子节点Options" class="required">
          <el-select
            v-model="radioForm.optionType"
            placeholder="请选择类型"
            size="small"
            style="margin-bottom: 10px"
          >
            <el-option label="array" value="array"></el-option>
            <el-option label="object" value="object"></el-option>
          </el-select>

          <el-form-item v-for="(item, index) in options" :key="index">
            <el-col :span="2" style="text-align: center">
              Key:
            </el-col>
            <el-col :span="8">
              <el-input v-model="options[index].value"></el-input>
            </el-col>
            <el-col :span="2" style="text-align: center">
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
                v-if="index > 0"
              ></el-button>
            </el-col>
          </el-form-item>
        </box>

        <box title="校验规则" class="required">
          <el-form-item label="校验规则需要为JSON格式：" prop="rules">
            <el-input
              type="textarea"
              v-model="radioForm.rules"
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
          <el-button type="primary" @click="submitForm('radioForm')">
            立即创建
          </el-button>
          <el-button @click="resetForm('radioForm')">重置</el-button>
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
      radioForm: {
        label: "radio",
        model: "radio",
        options: [],
        optionType: "array",
        size: "small",
        rules: "",
        border: false,
        disabled: false,
        componentWidth: 24
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
  computed: {
    JsonView() {
      return checkJson(this.radioForm.rules, ({ empty, success, fail }) => {
        if (empty) {
          return [];
        }

        if (success) {
          return JSON.parse(this.radioForm.rules);
        }

        if (fail) {
          return [];
        }
      });
    }
  },
  methods: {
    handleResult() {
      if (this.radioForm.optionType === "array") {
        this.radioForm.options = [...this.options];
      } else {
        this.radioForm.options = {};
        this.options.map(item => {
          this.radioForm.options[item.value] = item.label;
        });
      }
      const { rules, label, model, options, ...prop } = this.radioForm;

      for (let i in prop) {
        if (prop[i] === "") {
          delete prop[i];
        }
      }

      return {
        component: "el-radio",
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
