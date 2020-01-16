<template>
  <div class="select">
    <box title="select" type="danger">
      <el-form
        :model="selectForm"
        :rules="rules"
        ref="selectForm"
        label-width="100px"
        class="demo-selectForm"
        size="mini"
        label-position="top"
      >
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

          <el-form-item label="是否多选">
            <el-switch v-model="selectForm.multiple"> </el-switch>
          </el-form-item>

          <el-form-item label="禁用">
            <el-switch v-model="selectForm.disabled"> </el-switch>
          </el-form-item>

          <el-form-item label="输入框尺寸">
            <el-select v-model="selectForm.size" placeholder="请选择类型">
              <el-option label="medium" value="medium"></el-option>
              <el-option label="small" value="small"></el-option>
              <el-option label="mini" value="mini"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否可清空">
            <el-switch v-model="selectForm.clearable"> </el-switch>
          </el-form-item>

          <div v-if="selectForm.multiple">
            <el-form-item label="是否将选中值按文字的形式展示">
              <el-switch v-model="selectForm.collapseTags"> </el-switch>
            </el-form-item>

            <el-form-item label="多选时用户最多可以选择的项目数">
              <el-input-number
                v-model="selectForm.multipleLimit"
              ></el-input-number>
            </el-form-item>
          </div>

          <el-form-item label="输入框占位文本">
            <el-input v-model="selectForm.placeholder"></el-input>
          </el-form-item>

          <el-form-item label="是否可搜索">
            <el-switch v-model="selectForm.filterable"> </el-switch>
          </el-form-item>

          <el-form-item label="是否为远程搜索">
            <el-switch v-model="selectForm.remote"> </el-switch>
          </el-form-item>
        </box>

        <box title="子节点Options" class="required">
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
          </el-form-item>
        </box>

        <box title="校验规则" class="required">
          <el-form-item label="校验规则需要为JSON格式：" prop="rules">
            <el-input
              type="textarea"
              v-model="selectForm.rules"
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
        options: [],
        optionType: "array",
        label: "select",
        model: "select",
        rules: "",
        multiple: false,
        disabled: false,
        size: "small",
        clearable: false,
        collapseTags: false,
        multipleLimit: 0,
        placeholder: "",
        filterable: false,
        remote: false,
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
      if (this.selectForm.optionType === "array") {
        this.selectForm.options = [...this.options];
      } else {
        this.selectForm.options = Object.create(null);
        this.options.map(item => {
          this.selectForm.options[item.value] = item.label;
        });
      }

      const { label, model, options, ...prop } = this.selectForm;

      for (let i in prop) {
        if (prop[i] === "") {
          delete prop[i];
        }
      }

      return {
        component: "el-select",
        props: prop,
        events: {},
        rule: this.JsonView,
        model: model,
        label: label,
        options: options
      };
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.handleResult());
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
.select {
  margin: 10px;
  height: 98%;
  box-sizing: border-box;
}

.required {
  margin: 20px 0;
}
</style>
