<template>
  <div>
    <div class="header-trending">
      <h2>Today's Pick</h2>
    </div>
    <div class="container">
      <section id="hero-id">
        <img :src="hero.image" />
        <div class="container-hero">
          <h1>{{ hero.title }}</h1>
          <p>{{ hero.description }}</p>
          <router-link :to="'/show-page/' + hero.id">View</router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroSection",
  created: function () {
    this.$store.dispatch("fetchHero");
  },
  computed: {
    hero() {
      return this.$store.state.home.hero;
    }
  }
};
</script>
<style scoped>

div h2{
font-weight:1000;
padding:0;
margin-bottom:10px;
font-size:20px;
margin-left: auto;
margin-right: auto;
}
#hero-id img{
position:absolute;
margin-left: auto;
margin-right: auto;
left: 0;
right: 0;
z-index:-1;
width:100%;
height: 400px;
object-fit: cover;

}
.header-trending{
  margin-top:40px;
}
.container{ 
  z-index:1;
  display: flex;
  align-items: center;
  justify-content: center;

}
.container-hero { 
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  text-align: left;
  height: 100%;  
}

#hero-id {
  position: relative;
  background-color: rgba(0, 0, 0, 0.493);
  min-height: 400px;
  background-size: cover;
  width:var(--total-width); 
}

#hero-id h1 { 
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight:700;
  font-size: var(--title-hero);
  max-height:calc(var(--title-hero) * 3);
  padding:5px var(--hero-text-align) 5px var(--hero-text-align);
  text-shadow:0 0 0.1em rgb(255, 255, 255);
 
}
#hero-id p,h1{
  overflow:hidden;
  overflow-wrap: break-word;
  color:white;
 
}
#hero-id p{

  text-overflow: ellipsis;
  font-size:calc(var(--title-hero) / 2);
  max-height:calc(var(--title-hero) * 7);
  text-align: left;
  margin-left:var(--hero-text-align);
  line-height:calc(var(--title-hero) / 2.1);
  padding:5px;
  display: -webkit-box;
  -webkit-line-clamp: 15;
  -webkit-box-orient: vertical;
 
}
#hero-id a{
  text-decoration:none;
  font-weight:600;
  margin-top:10px;
  padding:10px;
  width:5em;
  height: 1em;
  margin-left:var(--hero-text-align);  
  border:0.1em solid white;
  border-radius:0.4em;
  color:var(--color-text);
  background:var(--transparent-text-background);
  text-align:center;
  transition: all 0.15s;
}
#hero-id a:hover{
  cursor:pointer;
  background: rgba(61, 61, 61, 0.308);
  -webkit-box-shadow: 0px 0px 39px 2px rgba(255,255,255,1);
  -moz-box-shadow: 0px 0px 39px 2px rgba(255,255,255,1);
  box-shadow: 0px 0px 10px 2px rgba(255,255,255,1);
  color:white;
}
</style>