<script lang="ts" setup>
import { useUserStore } from '~~/store/userStore';

const store = useUserStore()
const userCount = store.getUserCount
const totalInvestments = computed(() => {
  const amount = store.investments.reduce((acc, inv) => {
    return acc + (inv.description.includes("FortShield")? inv.amount / 590 : inv.amount);
  }, 0)
  return amount
})
const dueInvestmentAmount = computed(() => {
  const now = new Date().toISOString()
  const dueNow = store.investments.filter(
    (inv) => new Date(inv.dueDate.slice(0,10)).toString() === new Date(now.slice(0,10)).toString()
  );
  // if(dueNow.length === 0){
  //   return 0
  // }
  const totaldue = dueNow.reduce((acc, inv) => {
    return acc + (inv.description.includes("FortShield")? inv.amount / 590 : inv.amount) + inv.planYield;
  },0)
  return totaldue
})
const details = [
  {
    url: "users",
    numbers: `${userCount}`,
    title: "New users",
  },
  {
    url: "chart",
    numbers: `$${totalInvestments.value.toLocaleString('en-US', {minimumFractionDigits: 2})}`,
    title: "Total investment",
  },
  {
    url: "graph",
    numbers: `$${dueInvestmentAmount.value.toLocaleString('en-US', {minimumFractionDigits: 2})}`,
    title: "Total due investment",
  },
];
</script>
<template>
  <div class="flex gap-3 mb-12">
    <div
      class="card rounded-[10px] bg-white py-8 px-[50px] flex justify-center items-center w-full"
      v-for="(detail, index) in details"
    >
      <PNGImage :path="detail.url" :alt="`users-${index}`" class="mr-4" />
      <div class="details">
        <p class="text-xl font-semibold text-[#171717]">{{ detail.numbers }}</p>
        <p class="text-lg font-medium text-brand-ash">{{ detail.title }}</p>
      </div>
    </div>
  </div>
</template>
<style></style>
