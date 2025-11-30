<script>export default {

  props: {

    employee: { type: Object, required: true },

  },

};</script><template>

  <div class="card p-3">

    <h5>{{ employee.HoTenNV }}</h5>

    <p><strong>Mã số:</strong> {{ employee.MSNV }}</p>

    <p><strong>SĐT:</strong> {{ employee.SoDienThoai }}</p>

    <p><strong>Chức vụ:</strong> {{ employee.ChucVu }}</p>

  </div></template>