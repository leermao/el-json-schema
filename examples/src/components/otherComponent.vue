<template>
  <div class="other">
    <box title="other" type="danger">
      <el-form
        :model="selectForm"
        :rules="rules"
        ref="selectForm"
        label-width="100px"
        class="demo-selectForm"
        size="mini"
        label-position="top"
      >
        <el-form-item label="选择标签" prop="component">
          <el-select v-model="selectForm.component" placeholder="请选择类型">
            <el-option label="el-rate" value="el-rate"></el-option>
            <el-option
              label="el-input-number"
              value="el-input-number"
            ></el-option>
            <el-option label="el-cascader" value="el-cascader"></el-option>
          </el-select>
        </el-form-item>

        <box title="必填" class="required">
          <el-form-item label="label" prop="label">
            <el-input v-model="selectForm.label"></el-input>
          </el-form-item>

          <el-form-item label="name" prop="model">
            <el-input v-model="selectForm.model"></el-input>
          </el-form-item>
        </box>

        <box title="属性" class="required">
          <el-form-item label="组件宽度">
            <el-slider
              v-model="selectForm.componentWidth"
              :max="24"
            ></el-slider>
          </el-form-item>

          <el-form-item label="输入框尺寸">
            <el-select v-model="selectForm.size" placeholder="请选择类型">
              <el-option label="medium" value="medium"></el-option>
              <el-option label="small" value="small"></el-option>
              <el-option label="mini" value="mini"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="手动填写组件props">
            <div v-for="(item, index) in options" :key="index">
              <el-col :span="2" style="text-align: center">
                label:
              </el-col>
              <el-col :span="8">
                <el-input v-model="options[index].label"></el-input>
              </el-col>
              <el-col :span="2" style="text-align: center">
                value:
              </el-col>
              <el-col :span="8">
                <el-input v-model="options[index].value"></el-input>
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
            </div>
          </el-form-item>
        </box>

        <box title="校验规则" class="required">
          <el-form-item
            label="校验规则需要为JSON格式： （key值需要加双引号）"
            prop="rules"
          >
            <el-input
              type="textarea"
              v-model="selectForm.rules"
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
          <el-button type="primary" @click="submitForm('selectForm')">
            立即创建
          </el-button>
          <el-button @click="resetForm('selectForm')">重置</el-button>
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
      selectForm: {
        label: "",
        model: "",
        rules: "",
        componentWidth: 24,
        component: ""
      },
      rules: {
        label: [{ required: true, message: "请输入label", trigger: "blur" }],
        model: [{ required: true, message: "请输入model", trigger: "blur" }],
        component: [
          { required: true, message: "请选择组件", trigger: "change" }
        ],

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
      return checkJson(this.selectForm.rules, ({ empty, success, fail }) => {
        if (empty) {
          return [];
        }

        if (success) {
          return JSON.parse(this.selectForm.rules);
        }

        if (fail) {
          return [];
        }
      });
    }
  },
  methods: {
    handleResult() {
      const { label, model, component, ...prop } = this.selectForm;

      for (let i in prop) {
        if (prop[i] === "") {
          delete prop[i];
        }
      }

      const props = {};
      this.options.map(option => {
        props[option.label] = option.value;
      });

      return {
        component,
        props: { ...prop, ...props },
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
.other {
  margin: 10px;
  height: 98%;
  box-sizing: border-box;
}

.required {
  margin: 20px 0;
}
</style>
