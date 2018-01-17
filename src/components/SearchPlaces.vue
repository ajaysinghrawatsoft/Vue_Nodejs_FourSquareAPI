<template>
  <div>
    <h1>Search point of interest</h1>
    <form v-on:submit.prevent="addItem">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Location:</label>
            <input id="autocomplete"  type="text" class="form-control" v-model="location">
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Looking For?</label>
              <input type="text" class="form-control col-md-6" v-model="search" />
            </div>
          </div>
        </div><br />
        <div class="form-group">
          <button class="btn btn-primary">Search</button>
        </div>
    </form>


    <div v-if="items">
        <h3>Found</h3>

        <table class="table table-hover">
            <thead>
            <tr>
                <td>S.No</td>
                <td>Title</td>
                <td>Address</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="(item, index) in items">
                    <td>{{ index + 1}}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.location.address }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div v-else>
      <h5>No result found.</h5>
    </div>
  </div>


</template>
<script>
  
  export default {
   data(){
            return{
                items: []
            }
        },

    methods: {
      addItem(){
        this.location = document.getElementById('autocomplete').value;
        let uri = 'http://localhost:3000/api/search?search='+this.search+'&location='+this.location;
        this.axios.get(uri).then((response) => {
          this.items  = response.data.response.venues
        })
    }
  }
}
</script>