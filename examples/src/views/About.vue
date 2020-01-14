<template>
  <div class="about">
    <el-card class="box-card">
      <div class="setting">设置</div>
      <el-form ref="form" :model="form" label-width="150px" size="small">
        <el-col :span="8">
          <el-form-item label="表单类型">
            <el-radio-group v-model="form.type">
              <el-radio label="列表查询" :value="1"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="是否行内布局">
            <el-switch v-model="form.inline" active-color="#13ce66">
            </el-switch>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="label-width" style="width:100%">
            <el-slider v-model="form.labelWidth" :max="200"></el-slider>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="component-width" style="width:100%">
            <el-slider v-model="form.componentWidth" :max="24"></el-slider>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        type: "1",
        inline: true,
        labelWidth: 80,
        componentWidth: 6
      }
    };
  }
};
</script>
<style lang="less">
.setting {
  font-size: 18px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  &::before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 24px;
    background: red;
    margin-right: 10px;
  }
}
</style>
