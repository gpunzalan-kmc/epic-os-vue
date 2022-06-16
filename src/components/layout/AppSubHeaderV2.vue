<template>
  <header class="bg-gray-800 ">
    <div
      class="max-w-8xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex-row md:flex justify-between space-y-2 md:space-y-0"
    >
      <div class="flex  space-x-2 ">
        <slot name="title"></slot>
      </div>
      <slot name="action"></slot>
    </div>
  </header>
</template>
