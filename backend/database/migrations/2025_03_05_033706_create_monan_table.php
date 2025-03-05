<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('monan', function (Blueprint $table) {
            $table->tinyInteger("mon_id",true,true);
            $table->tinyInteger("pl_id")->unsigned();
            $table->string("mon_tenmon",50);
            $table->double("mon_giamon");
            $table->string("mon_mota",400);
            $table->char("mon_hinhmon",15);
            $table->boolean("mon_trangthai")->default(true);
            $table->foreign('pl_id')->references('pl_id')->on('phanloaimonan')->onUpdate('cascade')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('monan');
        Schema::table('monan', function (Blueprint $table) {
            $table->dropForeign(['monan_pl_id_foreign']);
            $table->dropIndex(['monan_pl_id_foreign']);
        });
    }
};
