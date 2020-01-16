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
        <box title="required" class="required">
          <el-form-item label="label" prop="label">
            <el-input v-model="selectForm.label"></el-input>
          </el-form-item>

          <el-form-item label="name" prop="model">
            <el-input v-model="selectForm.model"></el-input>
          </el-form-item>
        </box>

        <box title="props" class="required">
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
              ></el-button>
            </el-col>
          </el-form-item>
        </box>

        <el-form-item label="rules" prop="rules">
          <el-input type="textarea" v-model="selectForm.rules"></el-input>
        </el-form-item>

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
      selectForm: {
        options: [],
        optionType: "array",
        label: "",
        model: "",
        rules: "",
        multiple: false,
        disabled: false,
        size: "small",
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

      const { rules, label, model, options, ...prop } = this.selectForm;

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
