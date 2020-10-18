<template>
     <section class="container">
          <h1>Memo</h1>
          <table>
          <tr>
               <th>Title</th>
               <td><input type="text" name="title" class="title" size="40" v-model="title" @focus="set_flg"></td>
               <button @click="find">Find</button>
          </tr>
          <tr>
               <th>Memo</th>
               <td><textarea name="content" class="content" cols="50" rows="5" v-model="content"></textarea></td>
          </tr>
          <tr>
               <th></th>
               <td><button @click="insert">save</button>
               <transition name="del">
                    <button @click="remove">delete</button>
               </transition></td>
          </tr>
          </table>
          <hr>
          <ul class="list">
               <li v-foreach="item in page_items">
                    <span @click="select(item)">{{ item.title }}({{item.created}})</span>
               </li>
          </ul>
          <hr>
          <div class="nav">
               <span @click="prev">$lt;Prev</span>|<span @click="next">next&gt;</span>
          </div>
     </section>
</template>

<script>
export default {
     data:function() {
          return{
               title:'',
               content:'',
               num_per_page:7,
               find_flg:false,
               sel_flg:false,
          };
     },
     computed: {
          memo:function() {
               return this.$store.state.memo.memo;
          },
          page_items: function() {
               if(this.find_flg) {
                    var arr = [];
                    var data = this.$store.state.memo.memo;
                    data.forEach(element => {
                         if(element.title.toLowerCase().indexOf
                         (this.title.toLowerCase()) >= 0){
                         arr.push(element);
                         }
                    });
                    return arr;
               } else if(this.sel_flg != false){
                    return [this.sel_flg];
               } else {
                    return this.$store.state.memo.memo.slice(
                         this.num_per_page * this.$store.state.memo.page,this.num_per_page * (this.$store.state.memo.page + 1)
                    );
               }
          },
          page: {
               get: function() {
                    return this.$store.state.memo.page;
               },
               set: function(p) {
                    var pg = p > (this.$store.state.memo.memo.length - 1) /this.num_per_page ?
                    Math.ceil((this.$store.state.memo.memo.length - 1)/this.num_per_page) -1 :p;
                    pg = pg < 0 ? 0 :pg;
                    this.$store.commit('memo/set_page',pg);
               }
          },
     },
     methods: {
          set_flg: function() {
               if(this.find_flgd_flg || this.sel_flg != false) {
                    this.find_flg= false;
                    this.sel_flg = false;
                    this.title = "";
                    this.content = "";
               }
          },
          insert: function() {
               this.$store.commit('memo/insert',{title:this.title,content:this.content});
          },
          remove: function() {
               if (this.sel_flg == false) {
                    return;
               } else {
                    this.$store.commit('memo/remove',this.sel_flg);
                    this.sel_flg();
               }
          },
          find: function() {
               this.sel_flg == false;
               this.find_flg == true;
          },
          next: function() {
               this.page ++;
          },
          prev: function() {
               this.page --;
          },
          created: function() {
               this.$store.commit.('memo/set_page',0);
          },
     }
}
</script>