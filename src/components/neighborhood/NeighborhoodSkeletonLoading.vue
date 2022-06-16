<template>
  <div
    class="
                  border rounded-lg"
  >
    <el-skeleton-item variant="image" style="height: 14rem" />
    <div class="py-3 px-4 ">
      <el-skeleton-item
        variant="h1"
        class="
                          text-lg
                    
                          font-semibold
                          text-default
                          truncate
                        "
      />
      <div class="flex space-x-2 text-default text-sm ">
        <el-skeleton-item variant="p" class="truncate w-3/4  font-medium" />
      </div>
    </div>

    <div class="py-2  px-4 text-center tracking-wide grid grid-cols-2 gap-2">
      <div class="text-default justify-start">
        <el-skeleton-item variant="h2" class="text-sm font-semibold " />
      </div>
      <div class=" text-default justify-start">
        <el-skeleton-item variant="h2" class="text-sm font-semibold " />
      </div>
    </div>
    <div class="py-2  px-4 text-center tracking-wide grid grid-cols-2 gap-2">
      <div class="text-default justify-start">
        <el-skeleton-item variant="h2" class="text-sm font-semibold " />
      </div>
      <div class=" text-default justify-start">
        <el-skeleton-item variant="h2" class="text-sm font-semibold " />
      </div>
    </div>
    <div class="py-2 flex justify-between items-center w-full divide-x">
      <div class="px-2 w-1/3">
        <el-skeleton-item variant="p" class="w-full" />
      </div>
      <div class="px-2 w-1/3">
        <el-skeleton-item variant="p" class="w-full" />
      </div>
      <div class="px-2 w-1/3">
        <el-skeleton-item variant="p" class="w-full" />
      </div>
    </div>
  </div>
</template>
